import { render, remove} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction, UpdateType, SortType, FilterType } from '../const.js';
import SortModel from '../model/sortModel.js';
import NewPointPresenter from './new-point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import FilterModel from '../model/filter-model.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { TimeLimit } from '../const.js';


export default class EventPresenter {
  #eventsListView = new EventsListView();
  #emptyListView = null;
  #listContainer = null;
  #filterConteiner = null;
  /**
	* Список всех презентеров точек
	* @type {Map<string, PointPresenter>}
	*/
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #pointPresenter = null;
  #sortPresenter = null;
  #filtersPresenter = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #onNewPointDestroy = null;

  constructor({listContainer, pointsModel, offersModel, destinationsModel, filterConteiner, onNewPointDestroy}){
    this.#listContainer = listContainer;
    this.#filterConteiner = filterConteiner;

    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#sortModel = new SortModel();
    this.#filterModel = new FilterModel();

    this.#pointsModel.addObserver(this.#handelModelEvent);
    this.#sortModel.addObserver(this.#handelModelEvent);
    this.#filterModel.addObserver(this.#handelModelEvent);

    this.#onNewPointDestroy = onNewPointDestroy;

    this.#sortPresenter = new SortPresenter({
      listContainer,
      sortModel : this.#sortModel
    });

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listContainer.element,
      onPointChange: this.#handelViewAction,
      onDestroy: onNewPointDestroy,

    });
    this.#createFiltersPresenter();
  }

  get points(){
    const filteredPoints = this.#filtersPresenter.filterePoints(this.#pointsModel.points);
    const sortedPoints = this.#sortPresenter.sortPoints(filteredPoints);
    return sortedPoints;
  }

  #createFiltersPresenter(){
    this.#filtersPresenter = new FilterPresenter({
      filterConteiner : this.#filterConteiner,
      filterModel : this.#filterModel
    });
  }


  #handelViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.point.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update.point);
        } catch(err) {
          this.#pointPresenters.get(update.point.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handelModelEvent = (updateType, point) => {
    switch(updateType) {
      case UpdateType.PATCH :
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.MINOR :
        this.#clearPoints();
        this.init();
        break;
      case UpdateType.MAJOR :
        this.#clearPoints({resetSortType : true});
        this.init();
        break;
      case UpdateType.INIT :
        this.#isLoading = false;
        this.#clearPoints();
        this.init();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    this.#pointPresenter = new PointPresenter({
      eventsListView: this.#eventsListView,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handelViewAction,
      onModeChange: this.#handleModeChange
    });

    this.#pointPresenter.init(point);

    this.#pointPresenter.setOpenEditModeHandler(() => {
      this.#pointPresenters.forEach((presenter, pointId) => {
        if (point.id !== pointId) {
          presenter.closeEditMode();
        }
      });
    });

    this.#pointPresenters.set(point.id, this.#pointPresenter);

    document.addEventListener('keydown', this.#pointPresenter.escKeyDownHandler);
  }

  #clearPoints = (resetSortType = false) => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#pointPresenters.clear();

    if(resetSortType) {
      this.#sortModel.resetType();
    }
  };

  createPoint(){
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init({destinations: this.destinations, offers: this.offers});
  }


  #clearEmptyList() {
    if(this.#emptyListView) {
      remove(this.#emptyListView);
    }
  }

  #renderEmptyList() {
    const text = (() => {
      switch (this.#filterModel.filter) {
        case FilterType.EVERYTHING :
          return 'Click New Event to create your first point';
        case FilterType.FUTURE :
          return 'There are no future events now';
        case FilterType.PAST :
          return 'Thre are no past events now';
        case FilterType.PRESENT :
          return 'Thre ara no present events now';
      }
    })();

    this.#emptyListView = new ListEmpty({text});
    render(this.#emptyListView, this.#listContainer);
  }

  init() {
    this.#filtersPresenter.init();
    const points = [...this.points];
    this.#clearEmptyList();

    if(points.length) {
      this.#sortPresenter.init();
      render(this.#eventsListView, this.#listContainer);
      points.forEach((point) => this.#renderPoint(point));
    } else {
      this.#renderEmptyList();
    }
  }
}


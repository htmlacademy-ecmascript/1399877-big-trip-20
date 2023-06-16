import { render, remove} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction, UpdateType, SortType, FilterType } from '../const.js';
import SortModel from '../model/sortModel.js';
import AddPointPresenter from './add-point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import FilterModel from '../model/filter-model.js';


export default class EventPresenter {
  #eventsListView = new EventsListView();
  #listContainer = null;
  /**
	* Список всех презентеров точек
	* @type {Map<string, PointPresenter>}
	*/
  #pointPresenters = new Map();
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointPresenter = null;
  #sortPresenter = null;
  #sortModel = null;
  #filterModel = null;
  #newPoint = null;
  #emptyListView = null;
  #filtersPresenter = null;
  #filterConteiner = null;
  #currentSortType = SortType.DAY;
  #isLoading = true;

  constructor({listContainer, pointsModel, offersModel, destinationsModel, filterConteiner}){
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#sortModel = new SortModel();
    this.#filterModel = new FilterModel();
    this.#filterConteiner = filterConteiner;

    this.#pointsModel.addObserver(this.#handelModelEvent);
    this.#sortModel.addObserver(this.#handelModelEvent);
    this.#filterModel.addObserver(this.#handelModelEvent);

    this.#sortPresenter = new SortPresenter({
      listContainer,
      sortModel : this.#sortModel
    });

    this.#createFiltersPresenter();
    this.#hendelNewPoint();
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

  #addNewPoint = () => {
    this.#clearEmptyList();
    this.#newPoint = new AddPointPresenter({
      offers : this.#offersModel,
      destinations : this.#destinationsModel,
      eventsListView: this.#eventsListView,
      onDataChange: this.#handelViewAction,
      onCancel : () => this.init()
    });
    this.#newPoint.init();
  };

  #hendelNewPoint(){
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#addNewPoint);
  }

  #handelViewAction = (actionType, updateType, updatePoint) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, updatePoint);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType,updatePoint);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, updatePoint);
        break;
    }
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


  #renderPoint(point) {
    this.#pointPresenter = new PointPresenter({
      eventsListView: this.#eventsListView,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handelViewAction,
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


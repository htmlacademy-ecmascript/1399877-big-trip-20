import { render} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction, UpdateType } from '../const.js';


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

  constructor({listContainer, pointsModel, offersModel, destinationsModel}){
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handelModelEvent);

    this.#sortPresenter = new SortPresenter({
      listContainer,
      onSortChange: this.#handeSortChange
    });
  }

  get point(){
    return this.#pointsModel.get();
  }

  #handeSortChange = () => {
    this.#sortPresenter.destroy();
    this.#clearPoints();
    this.init();
  };


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
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.init(this.point);
        break;
      case UpdateType.MAJOR:
        this.#clearPoints(true);
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

  #clearPoints = ({resetSortType = false} = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if(resetSortType) {
      this.#sortPresenter.init(this.point);
    }
  };

  init() {
    const pointsData = [...this.point];
    this.#clearPoints(true);
    if (pointsData.length) {
      const sortedPoints = this.#sortPresenter.sortPoints(pointsData);
      this.#sortPresenter.init();
      render(this.#eventsListView, this.#listContainer);
      sortedPoints.forEach((point) => this.#renderPoint(point));
    } else {
      render(new ListEmpty, this.#listContainer);
    }
  }
}


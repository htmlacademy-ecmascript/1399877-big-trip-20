import { render} from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import SortPresenter from './sort-presenter.js';
import EventsListView from '../view/events-list-view.js';
import { UserAction, UpdateType, templatePoint } from '../const.js';
import SortModel from '../model/sortModel.js';
import AddPointPresenter from './add-point-presenter.js';

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
  #newPoint = null;

  constructor({listContainer, pointsModel, offersModel, destinationsModel}){
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#sortModel = new SortModel();

    this.#pointsModel.addObserver(this.#handelModelEvent);
    this.#sortModel.addObserver(this.#handelModelEvent);

    this.#sortPresenter = new SortPresenter({
      listContainer,
      sortModel : this.#sortModel
    });
  }

  get point(){
    return this.#pointsModel.get();
  }

  #addNewPoint = () => {
    this.#newPoint = new AddPointPresenter({
      point : templatePoint,
      offers : this.#offersModel,
      destinations : this.#destinationsModel,
      listContainer : this.#listContainer,
      onDataChange: this.#handelViewAction
    });
    this.#newPoint.init();
  };

  #hendelNewPoint(){
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#addNewPoint);
  }

  #handelViewAction = (actionType, updateType, updatePoint) => {
    console.log(actionType, updateType, updatePoint)
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
        this.init();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType : true});
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
      console.log(this.#sortModel);
    }
  };

  init() {
    this.#hendelNewPoint();
    const pointsData = [...this.point];
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


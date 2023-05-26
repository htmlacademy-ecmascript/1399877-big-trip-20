import { render } from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import EventsListView from '../view/events-list-view.js';
export default class EventPresenter {
  #eventsListView = new EventsListView();
  #listContainer = null;
  /**
	* Список всех презентеров точек
	* @type {Map<string, PointPresenter>}
	*/
  #points = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointPresenter = null;

  constructor({listContainer, pointsModel, offersModel, destinationsModel}){
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = new Map();
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);
    this.#points.get(updatedPoint.id)?.init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventsListView: this.#eventsListView,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handlePointChange
    });

    pointPresenter.init(point);

    pointPresenter.setOpenEditModeHandler(() => {
      this.#points.forEach((presenter, pointId) => {
        if (point.id !== pointId) {
          presenter.closeEditMode();
        }
      });
    });

    this.#points.set(point.id, pointPresenter);
  }

  init() {
    const pointsData = this.#pointsModel.get();
    if (pointsData.length) {
      render(this.#eventsListView, this.#listContainer);
      pointsData.forEach((point) => this.#renderPoint(point));
    } else {
      render(new ListEmpty, this.#listContainer);
    }
  }
}


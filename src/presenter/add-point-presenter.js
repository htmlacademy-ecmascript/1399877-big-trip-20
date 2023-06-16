import { render, remove, RenderPosition } from '../framework/render.js';
import NewEventPoint from '../view/new-event-point.js';
import {UpdateType, UserAction} from '../const.js';
import { getPointTemplate } from '../utils/point.js';

export default class AddPointPresenter {

  #point = null;
  #offers = null;
  #destinations = null;
  #eventsListView = null;
  #newPoint = null;
  #pointData = null;
  #handleDataChange = null;
  #handleCancel = null;

  constructor({point, offers, destinations, eventsListView, onDataChange, onCancel}) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#eventsListView = eventsListView;
    this.#handleDataChange = onDataChange;
    this.#handleCancel = onCancel;
  }

  #renderPoint(){
    this.#newPoint = new NewEventPoint({
      point : getPointTemplate(),
      offers : this.#offers.get(),
      destinations : this.#destinations.get(),
      onSave : this.#handlerPointSubmit,
      onClose : this.#closeAddPoint
    });
    render(this.#newPoint,this.#eventsListView.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handlerPointSubmit = (point) => {
    this.#pointData = point;
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...this.#pointData});
    this.#destroy();
  };

  #closeAddPoint = () => {
    this.#destroy();
  };

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape'){
      evt.preventDefault();
      this.#destroy();
    }
  };

  #destroy(){
    this.#handleCancel();
    remove(this.#newPoint);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  init(){
    this.#renderPoint();
  }
}



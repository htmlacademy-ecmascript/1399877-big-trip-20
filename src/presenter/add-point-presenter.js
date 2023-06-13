import { render, remove, RenderPosition } from '../framework/render.js';
import NewEventPoint from '../view/new-event-point.js';
import {UpdateType, UserAction} from '../const.js';

export default class AddPointPresenter {

  #point = null;
  #offers = null;
  #destinations = null;
  #listContainer = null;
  #newPoint = null;
  #pointData = null;
  #handleDataChange = null;

  constructor({point, offers, destinations, listContainer, onDataChange}) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#listContainer = listContainer;
    this.#handleDataChange = onDataChange;
  }

  #renderPoint(){
    this.#newPoint = new NewEventPoint({
      point : this.#point,
      offers : this.#offers.get(),
      destinations : this.#destinations.get(),
      onSave : this.#handlerPointSubmit,
      onClose : this.#closeAddPoint
    });
    render(this.#newPoint,this.#listContainer, RenderPosition.AFTERBEGIN);
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
    remove(this.#newPoint);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  init(){
    this.#renderPoint();
  }
}



import AbstractView from '../framework/view/abstract-view.js';

function createListEmpty(text) {
  return (`<p class="trip-events__msg">${text}</p>`);
}

export default class ListEmpty extends AbstractView{

  #text = null;

  constructor({text}) {
    super();
    this.#text = text;
  }

  get template() {
    return createListEmpty(this.#text);
  }
}

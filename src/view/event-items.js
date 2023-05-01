import { createElement } from '../render.js';

export default class ItemsEvent {
  constructor(el){
    this.el = el;
  }

  getTemplate() {
    return this.el;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}


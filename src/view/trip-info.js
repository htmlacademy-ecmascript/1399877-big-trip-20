import { createElement } from '../render.js';

function createHeaderTemplate() {
  return (`<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>
</section>`);
}

function createTitleTemplate(){
  return (`<div class="trip-info__main">
  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
</div>`);
}
function createTatalPrice() {
  return(`<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
</p>`);
}

class newElementHeader {
  constructor(el){
    this.el = el;
  }

  getTemplate() {
    return this.el();
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

const templateHeaderSeaction = new newElementHeader(createHeaderTemplate);
const titleHeader = new newElementHeader(createTitleTemplate);
const price = new newElementHeader(createTatalPrice);

export{templateHeaderSeaction,titleHeader,price};


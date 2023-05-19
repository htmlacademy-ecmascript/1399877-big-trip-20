import AbstractView from '../framework/view/abstract-view.js';

function createInfoViewTemplate() {
  return (`<section class="trip-main__trip-info  trip-info">
  ${createTitleTemplate()}
  ${createTotalPriceTemplate()}
</section>`);

  function createTitleTemplate() {
    return (`<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`);
  }

  function createTotalPriceTemplate() {
    return (`<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`);
  }
}

export default class InfoView extends AbstractView{

  get template() {
    return createInfoViewTemplate();
  }
}


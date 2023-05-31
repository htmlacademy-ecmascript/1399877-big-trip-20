import AbstractView from '../framework/view/abstract-view.js';
import { enabledSortType } from '../const.js';

function getSortItem(sortItem) {
  return `
  <div class="trip-sort__item  trip-sort__item--${sortItem.type}">
    <input
    id="sort-${sortItem.type}"
    class="trip-sort__input
    visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-${sortItem.type}"
    data-sort-type="${sortItem.type}"
    ${(sortItem.isChecked) ? 'checked' : ''}
    ${(sortItem.isDisabled) ? 'disabled' : ''}
  >
  <label
    class="trip-sort__btn"
    for="sort-${sortItem.type}></label>
</div>`;
}

function createSortTemplate({sortMap}){
  return(`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortMap.map((sortItem) => getSortItem(sortItem)).join('')}
  </form>`);
}

export default class SortView extends AbstractView{

  #sortMap = null;
  #onsortTypeChange = null;

  constructor({onsortTypeChange, SortType}){
    super();

    this.#sortMap = Object.values(SortType)
      .map((type) => ({
        type,
        isChecked: (type === SortType),
        isDisabled: (enabledSortType[type])
      }));

    this.#onsortTypeChange = onsortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  }

  get template() {
    return createSortTemplate({sortMap: this.#sortMap});
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onsortTypeChange(evt.target);
  };
}

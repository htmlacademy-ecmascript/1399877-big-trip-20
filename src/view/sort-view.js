import AbstractView from '../framework/view/abstract-view.js';
import { enabledSortType } from '../const.js';
import { SortType } from '../const.js';

function getSortItem(sortItem) {
  return `
  <div class="trip-sort__item  trip-sort__item--${sortItem.type}">
    <input id="sort-${sortItem.type}"
     class="trip-sort__input
     visually-hidden"
     type="radio"
     name="trip-sort"
     value="sort-${sortItem.type}"
     data-sort-type="${sortItem.type}"
    ${(sortItem.isChecked) ? 'checked' : ''}
    ${(sortItem.isDisabled ? 'disabled' : '')}
  >
  <label
    class="trip-sort__btn"
    for="sort-${sortItem.type}">
    ${sortItem.type}
  </label>
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
  #SortType = null;

  constructor({onSortTypeChange, currentSortType}){
    super();

    this.#sortMap = Object.values(SortType)
      .map((type) => ({
        type,
        isChecked: (type === currentSortType),
        isDisabled: (!enabledSortType[type])
      }));


    this.#onsortTypeChange = onSortTypeChange;
    this.#SortType = SortType;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);

  }

  get template() {
    return createSortTemplate({sortMap: this.#sortMap});
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.closest('.trip-sort__input')){
      evt.preventDefault();
      this.#onsortTypeChange(evt.target.dataset['sortType']);
      // console.log(SortType[(evt.target.dataset['sortType']).toUpperCase()]);
    }
  };
}

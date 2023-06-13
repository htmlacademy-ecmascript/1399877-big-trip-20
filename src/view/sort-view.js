import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
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

function createSortTemplate({sortType}){
  const sortMap = Object.values(SortType)
    .map((type) => ({
      type,
      isChecked: (type === sortType),
      isDisabled: (!enabledSortType[type])
    }));
  return(`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortMap.map((sortItem) => getSortItem(sortItem)).join('')}
  </form>`);
}

export default class SortView extends AbstractStatefulView{

  #onsortTypeChange = null;

  constructor({onSortTypeChange, currentSortType}){
    super();

    this._setState({
      sortType : currentSortType
    });

    this.#onsortTypeChange = onSortTypeChange;

    this._restoreHandlers();

  }

  _restoreHandlers() {
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this._state);
  }

  #sortTypeChangeHandler = (evt) => {
    const eventSortType = evt.target.dataset.sortType;


    if(eventSortType){
      evt.preventDefault();
      this.#onsortTypeChange(eventSortType);
    }
  };
}

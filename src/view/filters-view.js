import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { FilterType } from '../const.js';

function createFilterItem(type, currentFilterType) {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
      ${type === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFiltersTemplate(currentFilterType){
  const filterItemsTemplate = Object.values(FilterType)
    .map((type) => createFilterItem(type, currentFilterType)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}


export default class FilterView extends AbstractStatefulView {

  #handleFilterTypeChancge = null;

  constructor({currentFilterType, onFilterChange}){
    super();
    this.#handleFilterTypeChancge = onFilterChange;

    this._setState({
      currentFilterType
    });

    this._restoreHandlers();
  }

  get template() {
    return createFiltersTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChancge(evt.target.value);
  };
}

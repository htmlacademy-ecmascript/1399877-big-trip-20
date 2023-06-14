import AbstractView from '../framework/view/abstract-view.js';

function createFilterItem(filter, currentFilterType) {
  const {type, disabled } = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
      ${type === currentFilterType ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFiltersTemplate(filters, currentFilterType){
  const filterItemsTemplate = filters
    .map((filter) => createFilterItem(filter, currentFilterType)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}


export default class FilterView extends AbstractView{

  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChancge = null;

  constructor({filters, currentFilterType, onFilterChange}){
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChancge = onFilterChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChancge(evt.target.value);
  };
}

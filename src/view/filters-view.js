import AbstractView from '../framework/view/abstract-view.js';

function createFilterItem(filter) {
  return `
  <div class="trip-filters__filter">
    <input
      id="filter-everything"
      class="trip-filters__filter-input
      visually-hidden" type="radio"
      name="trip-filter"
      value="${filter.type}"
      ${(filter.hasPoints) ? '' : 'disabled'}
    >
    <label
      class="trip-filters__filter-label"
      for="${filter.type}"
    >
      ${filter.type}
    </label>
  </div>`;
}

function createFiltersTemplate(filters){
  return(`
    <form class="trip-filters" action="#" method="get">
      ${filters.map(createFilterItem).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
}


export default class FilterView extends AbstractView{

  #filters = null;

  constructor(filters){
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}

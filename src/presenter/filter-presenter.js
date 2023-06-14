import FilterView from '../view/filters-view.js';

import { filter } from '../utils/filter.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType, FilterType } from '../const.js';

export default class FilterPresenter{

  #filterConteiner = null;
  #filterComponent = null;

  #pointsModel = null;
  #filterModel = null;

  #currentFilterType = null;

  constructor ({pointsModel,filterConteiner, filterModel}){
    this.#pointsModel = pointsModel;
    this.#filterConteiner = filterConteiner;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const points = this.#pointsModel.get();

    return Object.values(FilterType).map((type) => ({
      type,
      disabled: !filter[type](points).length
    }));

  }


  init(){
    this.#currentFilterType = this.#filterModel.filter;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView({
      filters : this.filters,
      currentFilterType : this.#currentFilterType,
      onFilterChange : this.#filterTypeChangeHandler
    });

    if(prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterConteiner);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if(this.#filterModel.filter !== filterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };

  destroy(){
    remove(this.#filterComponent);
  }

}

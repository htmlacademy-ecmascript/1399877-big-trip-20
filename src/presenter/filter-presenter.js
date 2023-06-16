import FilterView from '../view/filters-view.js';
import { filter } from '../utils/filter.js';
import { render, remove } from '../framework/render.js';
import { UpdateType, FilterType } from '../const.js';
export default class FilterPresenter{

  #filterComponent = null;
  #filterModel = null;

  constructor ({filterConteiner, filterModel}){
    this.#filterModel = filterModel;

    this.#filterComponent = new FilterView({
      currentFilterType : this.#filterModel.filter,
      onFilterChange : this.#filterTypeChangeHandler
    });

    render(this.#filterComponent, filterConteiner);
  }

  filterePoints(points) {
    return filter[this.#filterModel.filter](points);
  }

  init(){
    this.#filterComponent.updateElement({
      currentFilterType : this.#filterModel.filter,
    });
  }

  #filterTypeChangeHandler = (filterType) => {
    if(!this.#filterModel.filter !== FilterType) {
      this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  };

  destroy() {
    remove(this.#filterComponent);
  }

}

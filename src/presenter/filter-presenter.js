import FilterView from '../view/filters-view.js';

import { generateFilters } from '../model/filter.js';
import { render } from '../framework/render.js';


export default class FilterPresenter{

  #pointModel = null;
  #filterConteiner = null;
  #filters = [];

  constructor (pointModel,filterConteiner){
    this.#pointModel = pointModel;
    this.#filterConteiner = filterConteiner;

    this.#filters = generateFilters(this.#pointModel.get());
  }

  init(){
    render(new FilterView(this.#filters), this.#filterConteiner);
  }

}

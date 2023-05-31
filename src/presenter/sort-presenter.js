import SortView from '../view/sort-view.js';
import {render, RenderPosition, replace, remove} from '../framework/render.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort.js';


export default class SortPresenter{
  #listContainer = null;
  #currentSortType = SortType.DAY;
  #onSortChange = null;
  #sortView = null;

  constructor({listContainer, onSortChange}){
    this.#listContainer = listContainer;
    this.#onSortChange = onSortChange;
  }

  #onSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#onSortChange?.();
  };

  #createSortView = () => {
    this.SortView = new SortView({onSortTypeChange : this.#onSortTypeChange, currentSortType : this.#currentSortType});
    return this.SortView;
  };

  #sortRender() {
    if(!this.#sortView){
      render(this.#createSortView(), this.#listContainer, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#createSortView(), this.#sortView);
    }
  }

  sortPoints(points) {
    return sort[this.#currentSortType](points);
  }

  destroy(){
    remove(this.SortView);
  }

  init(){
    this.#sortRender();
  }
}

import SortView from '../view/sort-view.js';
import {render, RenderPosition, replace, remove} from '../framework/render.js';
import { SortType } from '../const.js';
import { sort } from '../utils/sort.js';
import { UpdateType, UserAction } from '../const.js';

export default class SortPresenter{
  #listContainer = null;
  #currentSortType = SortType.DAY;
  #onSortChange = null;
  #sortView = null;
  #points = null;

  constructor({listContainer, onSortChange}){
    this.#listContainer = listContainer;
    this.#onSortChange = onSortChange;
  }

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#onSortChange?.();
    }
  };

  #createSortView = () => {
    this.#sortView = new SortView({onSortTypeChange : this.#onSortTypeChange, currentSortType : this.#currentSortType});
    return this.#sortView;
  };

  #sortRender() {
    if(!this.#sortView){
      render(this.#createSortView(), this.#listContainer, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#createSortView(), this.#sortView);
    }
  }

  sortPoints(points) {
    this.#points = sort[this.#currentSortType](points);
    return (UserAction.UPDATE_POINT,
    UpdateType.MINOR,
    this.#points);
  }

  destroy(){
    remove(this.#sortView);
  }

  init(){
    this.#sortRender();
  }
}

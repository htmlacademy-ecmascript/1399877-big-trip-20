import SortView from '../view/sort-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import { sort } from '../utils/sort.js';
import { UpdateType } from '../const.js';

export default class SortPresenter{
  #listContainer = null;
  #sortView = null;
  #sortModel = null;

  constructor({listContainer, sortModel}){
    this.#listContainer = listContainer;
    this.#sortModel = sortModel;
  }

  #onSortTypeChange = (sortType) => {
    if (!this.#sortModel.type !== sortType) {
      this.#sortModel.setType(UpdateType.MINOR,sortType);
    }
  };

  sortPoints(points) {
    return sort[this.#sortModel.type](points);
  }

  destroy(){
    remove(this.#sortView);
  }

  init(){
    if(!this.#sortView) {
      this.#sortView = new SortView({
        onSortTypeChange : this.#onSortTypeChange,
        currentSortType : this.#sortModel.type
      });
      render(this.#sortView, this.#listContainer, RenderPosition.AFTERBEGIN);
    } else {
      this.#sortView.updateElement({
        sortType : this.#sortModel.type
      });
    }

  }
}

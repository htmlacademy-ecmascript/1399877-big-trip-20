import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../framework/render.js';
import { SortType } from '../const.js';


export default class SortPresenter{
  #listContainer = null;
  #pointsModel = null;
  #currentSortType = null;
  #sortView = null;
  #points = null;

  constructor({listContainer, points}){
    this.#listContainer = listContainer;
    this.#points = points;
  }

  #onsortTypeChange = (sortType) => {
    console.log(1);
  };

  #sortRender(){
    render(new SortView(
      {onsortTypeChange : this.#onsortTypeChange,
        SortType : SortType
      }),this.#listContainer, RenderPosition.AFTERBEGIN
    );
  }

  init(){
    this.#sortRender();
    console.log(1);
  }
}

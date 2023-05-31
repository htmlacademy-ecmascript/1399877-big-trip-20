import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../framework/render.js';
import {sort} from '../utils/sort.js';
import { SortType } from '../const.js';


export default class SortPresenter{
  #listContainer = null;
  #pointsModel = null;
  #currentSortType = null;
  #sortView = null;

  constructor({listContainer, pointsModel}){
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  #onsortTypeChange = (sortType) => {
    console.log(sort[sortType]);
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
  }
}

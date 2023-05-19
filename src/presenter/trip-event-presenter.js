import { render } from '../framework/render.js';
import ListEvent from '../view/event-list-view.js';

export default class EventPresenter {

  #eventComponent = new ListEvent();
  #listContainer;
  #pointPresentor;
  constructor(listContainer,pointPresentor){
    this.#listContainer = listContainer;
    this.#pointPresentor = pointPresentor;
  }

  init(){
    render(this.#eventComponent,this.#listContainer);
    // this.pointPresentor.get();
    // this.pointPresentor.initRender(this.#listContainer);
    // render(new FormItemEvent(), this.#eventComponent.element);
  }
}


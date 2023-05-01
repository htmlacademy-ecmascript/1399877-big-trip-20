import { render } from '../render.js';
import ListEvent from '../view/event-list-view.js';
import FormItemEvent from '../view/event-edit.js';
import { ITEMS_EVENT } from '../view/data-event-list.js';
import ItemsEvent from '../view/event-items.js';
// function createItemEvent(el){
//   return el;
// }

export default class EventPresenter {

  eventComponent = new ListEvent();

  constructor({listContainer}){
    this.listContainer = listContainer;
  }

  init(){
    render(this.eventComponent,this.listContainer);
    render(new FormItemEvent(), this.eventComponent.getElement());
    render(new ListEvent(), this.eventComponent.getElement());

    for(let i = 0; i < ITEMS_EVENT.length; i++){
      render(new ItemsEvent(ITEMS_EVENT[i]),this.eventComponent.getElement());
    }
  }
}

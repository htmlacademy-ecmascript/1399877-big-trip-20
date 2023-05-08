import { render } from '../render.js';
import ListEvent from '../view/event-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import FormItemEvent from '../view/event-edit.js';

export default class EventPresenter {

  eventComponent = new ListEvent();

  constructor({listContainer}){
    this.listContainer = listContainer;
  }

  init(){
    render(this.eventComponent,this.listContainer);
    render(new FormItemEvent(), this.eventComponent.getElement());

    for(let i = 0; i < 3; i++){
      render(new EventsItemView(), this.eventComponent.getElement());
    }
  }
}


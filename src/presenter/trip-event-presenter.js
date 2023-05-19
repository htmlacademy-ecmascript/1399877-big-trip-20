import { render } from '../framework/render.js';
import ListEvent from '../view/event-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import FormItemEvent from '../view/event-edit.js';

export default class EventPresenter {

  #eventComponent = new ListEvent();

  constructor({listContainer, pointsModel, offersModel, destinationsModel}){
    this.listContainer = listContainer;
    this.point = pointsModel;
    this.offer = offersModel;
    this.destination = destinationsModel;
    this.points = pointsModel.get();
  }

  #renderPoint = () => {

  }

  init(){
    render(this.#eventComponent,this.listContainer);
    // render(new FormItemEvent(), this.#eventComponent.element);


    this.points.forEach((point) => {
      render(
        new EventsItemView({
          point,
          pointDestination : this.destination.getById(point.destination),
          pointOffers: this.offer.getByType(point.type)
        }),
        this.#eventComponent.element);
    });

  }
}


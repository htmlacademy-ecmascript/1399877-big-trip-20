import { render } from '../render.js';
import ListEvent from '../view/event-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import FormItemEvent from '../view/event-edit.js';

export default class EventPresenter {

  eventComponent = new ListEvent();

  constructor({listContainer}, pointModel, offerModel, destinationModel){
    this.listContainer = listContainer;
    this.point = pointModel;
    this.offer = offerModel;
    this.destination = destinationModel;

    this.points = pointModel.get();
  }

  init(){
    render(this.eventComponent,this.listContainer);
    render(new FormItemEvent(), this.eventComponent.getElement());


    this.points.forEach((point) => {
      render(
        new EventsItemView({
          point,
          pointDestination : this.destination.getById(point.destination),
          pointOffers: this.offer.getByType(point.type)
        }),
        this.eventComponent.getElement());
    });

  }
}


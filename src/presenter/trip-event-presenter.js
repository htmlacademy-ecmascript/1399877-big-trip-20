import { render, replace } from '../framework/render.js';
import ListEvent from '../view/event-list-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventEdit from '../view/event-edit.js';
import ListEmpty from '../view/list-empty.js';
export default class EventPresenter {

  #eventComponent = new ListEvent();
  #points = null;
  #listContainer = null;
  #point = null;
  #offer = null;
  #destination = null;

  constructor({listContainer, pointsModel, offersModel, destinationsModel}){
    this.#listContainer = listContainer;
    this.#point = pointsModel;
    this.#offer = offersModel;
    this.#destination = destinationsModel;
    this.#points = pointsModel.get();
  }

  #renderPoint = (point) => {
    const pointComponent = new EventsItemView({
      point,
      pointDestination : this.#destination.getById(point.destination),
      pointOffers: this.#offer.getByType(point.type)
    });
    // render(pointComponent,this.#eventComponent.element);

    const pointEditComponent = new EventEdit({
      point,
      pointDestination : this.#destination.get(),
      pointOffers: this.#offer.get()
    });

    const replacePointToEdit = () => {
      replace(pointEditComponent, pointComponent);
    };
    const replaceEditToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    pointComponent.setEditHandler(()=>replacePointToEdit());
    pointEditComponent.setEditHandler(()=>replaceEditToPoint());
    render(pointComponent,this.#eventComponent.element);
  };

  #renderEditPoint = (point) => {
    const pointEditComponent = new EventEdit({
      point,
      pointDestination : this.#destination.get(),
      pointOffers: this.#offer.get()
    });
    render(pointEditComponent,this.#eventComponent.element);
  };

  init(){
    if(this.#points.length > 0){
      render(this.#eventComponent,this.#listContainer);
      this.#points.forEach((point)=> {
        this.#renderPoint(point);
      });
    }else {
      render(new ListEmpty, this.#listContainer);
    }
  }
}


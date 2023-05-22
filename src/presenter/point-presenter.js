import { render, replace } from '../framework/render.js';
import ListEvent from '../view/event-list-view.js';
import EventsView from '../view/events-view.js';
import EventEdit from '../view/event-edit.js';
export default class PointPresenter{
  #eventComponent = new ListEvent();
  #listContainer = null;
  #point = null;
  #offer = null;
  #destination = null;
  #points = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #replacePointToEdit = null;
  constructor({listContainer, point, offers, destinations}){
    this.#listContainer = listContainer;
    this.#point = point;
    this.#offer = offers;
    this.#destination = destinations;

  }

  #renderPoint = (point) => {
    this.#pointComponent = new EventsView({
      point,
      pointDestination : this.#destination.getById(point.destination),
      pointOffers: this.#offer.getByType(point.type)
    });
    this.#pointEditComponent = new EventEdit({
      point,
      pointDestination : this.#destination.get(),
      pointOffers: this.#offer.get()
    });


    const replaceEditToPoint = () => {
      replace(this.#pointComponent, this.#pointEditComponent);
    };

    this.#pointEditComponent.setEditHandler(()=>replaceEditToPoint());
    render(this.#pointComponent,this.#eventComponent.element);
  };

  onOpenEditMode(){
    this.#replacePointToEdit = () => {
      replace(this.#pointEditComponent, this.#pointComponent);
      this.#pointComponent.setEditHandler(()=>this.#replacePointToEdit());
    };
  }

  init(){
    render(this.#eventComponent,this.#listContainer);
    this.#renderPoint(this.#point);
  }
}

import { render, replace } from '../framework/render.js';
import EventsView from '../view/event-view.js';
import EventEdit from '../view/event-edit.js';

const PointMode = {
  VIEW: 'view',
  EDIT: 'edit',
};

export default class PointPresenter{

  #eventsListView = null;
  #point = null;
  #offer = null;
  #destination = null;
  #points = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #openEditModeHandler = null;

  #mode = null;
  #modeFavorite = null;
  #openFavoritModeHandler = null;
  #changeFavorite = null;
  #isFavorite = null;

  constructor({eventsListView, point, offers, destinations}){
    this.#eventsListView = eventsListView;
    this.#point = point;
    this.#offer = offers;
    this.#destination = destinations;
    this.#mode = PointMode.VIEW;
    this.#modeFavorite = this.#point.isFavorite;
  }

  #renderPoint = (point) => {
    this.#pointComponent = new EventsView({
      point,
      pointDestination : this.#destination.getById(point.destination),
      pointOffers: this.#offer.getByType(point.type)
    });
    this.#isFavorite = ()=>{
      const element = this.#pointComponent.element.querySelector('.event__favorite-btn')
      if(point.isFavorite){
        element.classList.remove('.event__favorite-btn--active');
      }else{
        element.classList.add('.event__favorite-btn--active');
      }
    };
    this.#pointEditComponent = new EventEdit({
      point,
      pointDestination : this.#destination.get(),
      pointOffers: this.#offer.get()
    });

    this.#pointEditComponent.setEditHandler(this.closeEditMode);
    this.#pointComponent.setEditHandler(this.openEditMode);

    this.#pointComponent.setFavoritHandler(this.  changeFavorite);
    this.#isFavorite();
    render(this.#pointComponent,this.#eventsListView.element);
  };


  #replacePointToEdit = () => {
    this.#mode = PointMode.EDIT;
    replace(this.#pointEditComponent, this.#pointComponent);

  };

  #replaceEditToPoint = () => {
    this.#mode = PointMode.VIEW;
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  openEditMode = () =>{
    if(this.#mode === PointMode.VIEW){
      this.#replacePointToEdit();
      this.#openEditModeHandler?.();
    }
  };

  setOpenEditModeHandler = (cb) =>{
    this.#openEditModeHandler = cb;

  };

  closeEditMode = () => {
    if(this.#mode === PointMode.EDIT){
      this.#replaceEditToPoint();
    }
  };


  setChangeFavoriteHandler = (cb) => {
    this.#openFavoritModeHandler = cb;
  };

  setValueFavorite = () => {
    this.#point.isFavorite = this.#modeFavorite;
  };

  changeFavorite = () => {
    if(this.#modeFavorite === true){
      this.#modeFavorite = false;
      this.#openFavoritModeHandler();
    }else{
      this.#modeFavorite = true;
      this.#openFavoritModeHandler();
    }
    // render(this.#pointComponent,this.#eventsListView.element);
  };


  init(){

    this.#renderPoint(this.#point);
  }
}

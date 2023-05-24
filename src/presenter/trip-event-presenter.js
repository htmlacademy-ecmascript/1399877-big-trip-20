import { render } from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import EventsListView from '../view/events-list-view.js';

export default class EventPresenter {
  #eventsListView = new EventsListView();
  #points = null;
  #listContainer = null;
  #point = null;
  #offer = null;
  #destination = null;

  #pointPresenter = null;

  constructor({listContainer, pointsModel, offersModel, destinationsModel}){
    this.#listContainer = listContainer;
    this.#point = pointsModel;
    this.#offer = offersModel;
    this.#destination = destinationsModel;
    this.#points = new Map();
  }


  #renderPoint(point){
    this.#pointPresenter = new PointPresenter({
      eventsListView: this.#eventsListView,
      point: point,
      offers: this.#offer,
      destinations: this.#destination,
    });
    this.#pointPresenter.init();

    this.#pointPresenter.setOpenEditModeHandler(() => {
      this.#points.forEach((presentor,pointId)=>{
        if(point.id !== pointId){
          presentor.closeEditMode();
        }
      });
    });
    this.#pointPresenter.setChangeFavoriteHandler(()=>{
      this.#points.forEach((presentor,pointId) => {
        if(point.id === pointId){
          presentor.setValueFavorite();
        }
      });
    });
    this.#points.set(point.id, this.#pointPresenter);
  }

  init(){
    if(this.#point.get().length > 0){
      render(this.#eventsListView,this.#listContainer);
      this.#point.get().forEach((point)=> {
        this.#renderPoint(point);
      });

    }else {
      render(new ListEmpty, this.#listContainer);
    }
  }
}


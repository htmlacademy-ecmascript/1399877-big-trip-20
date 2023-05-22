import { render } from '../framework/render.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';

export default class EventPresenter {
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
    this.#points = new Map();
  }


  #renderPoints(point){
    const pointPresentor = new PointPresenter({
      listContainer: this.#listContainer,
      point: point,
      offers: this.#offer,
      destinations: this.#destination,
    });

    this.#points.set(point.id, pointPresentor);
    pointPresentor.init();

    pointPresentor.onOpenEditMode(() => {
      this.#points.forEach((pointId, presentor)=>{
        if(point.id === pointId){
          presentor.closeEditMode();
        }
      });
    });
  }

  init(){
    if(this.#point.get().length > 0){
      this.#point.get().forEach((point)=> {
        this.#renderPoints(point);
      });

    }else {
      render(new ListEmpty, this.#listContainer);
    }
    console.log(this.#points);
  }
}


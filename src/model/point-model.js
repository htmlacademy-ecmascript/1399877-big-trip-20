import Observable from '../framework/observable.js';
export default class PointModel extends Observable{

  #service = null;
  #points = null;
  constructor(service){
    super();
    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get(){
    return this.#points;
  }

  updatePoint(updateType, updatedPoint) {
    this.#points.find((point) => {
      if(point.id === updatedPoint.id) {
        Object.assign(point, updatedPoint);
      }
    });
    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, updatedPoint){
    this.#points = [
      updatedPoint,
      ...this.#points,
    ];
    this._notify(updateType, updatedPoint);
  }

  deletePoint(updateType, updatedPoint){
    const pointIndex = this.#points.find((point) => point.id === updatedPoint.id);
    this.#points = [
      ...this.#points.slice(0,pointIndex),
      ...this.#points.slice(pointIndex, +1)
    ];
    this._notify(updateType,updatedPoint);
  }
}

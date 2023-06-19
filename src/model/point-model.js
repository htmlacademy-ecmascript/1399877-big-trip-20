import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable{

  #service = null;
  #points = [];
  #offersModel = null;
  #destinationsModel = null;

  constructor({service, offersModel, destinationsModel}){
    super();
    this.#service = service;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get points(){
    return this.#points;
  }

  async init() {
    try {
      await Promise.all([
        this.#offersModel.init(),
        this.#destinationsModel.init(),
      ]);
      const points = await this.#service.getPoints();
      this.#points = points.map(this.#adaptToClient);
      this._notify(UpdateType.INIT, {isError : false});
    } catch {
      this.#points = [];
      this._notify(UpdateType.INIT, {isError : true});
    }
  }

  async updatePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const respose = await this.#service.updatePoint(update);
      const updatedPoint = this.#adaptToClient(respose);

      this.#points[index] = updatedPoint;
      this._notify(updateType, update);

    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#service.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, update);


    } catch(err) {
      throw new Error('Can\'t add point');
    }

  }

  async deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#service.deletePoint(update);
      this.#points.splice(index, 1);

      this._notify(updateType);

    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }


  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  getCitiesNames = () => this.#destinationsModel.map((destination) => destination.name);

  getEventsTypes = () => this.#offersModel.map((offer) => offer.type);
}

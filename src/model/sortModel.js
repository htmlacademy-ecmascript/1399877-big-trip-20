import Observable from '../framework/observable.js';
import { SortType } from '../const.js';

export default class SortModel extends Observable {
  #type = SortType.DAY;

  get type() {
    return this.#type;
  }

  setType(updateType, type) {
    this.#type = type;
    this._notify(updateType, type);
  }

  resetType(){
    this.#type = SortType.DAY;
  }

}

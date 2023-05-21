export default class PointPresentor{
  #point = null;
  #offer = null;
  #destination = null;

  #points = null;
  constructor({ pointsModel, offersModel, destinationsModel}){
    this.#point = pointsModel;
    this.#offer = offersModel;
    this.#destination = destinationsModel;

    this.#points = pointsModel.get();
  }


}

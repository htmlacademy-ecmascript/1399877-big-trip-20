export default class ModelPoint{

  constructor(service){
    this.service = service;
    this.point = this.service.getPoints();
  }

  get(){
    return this.point;
  }
}

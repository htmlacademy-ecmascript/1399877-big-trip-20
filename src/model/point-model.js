export default class PointModel{

  constructor(service){
    this.service = service;
    this.point = this.service.getPoints();
  }

  get(){
    return this.point;
  }

  updatePoint(updatedPoint) {
    this.point.find((point) => {
      if(point.id === updatedPoint.id) {
        Object.assign(point, updatedPoint);
      }
    });
  }
}

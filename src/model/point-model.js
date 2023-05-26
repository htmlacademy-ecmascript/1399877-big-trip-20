export default class PointModel{

  constructor(service){
    this.service = service;
    this.point = this.service.getPoints();
  }

  get(){
    return this.point;
  }

  // updatePoint(updatedPoint) {
  //   this.points.find(point => {
  //     if (point.id === updatedPoint.id) {
  //       Object.assign(point, updatedPoint); // Потом заменить на вложенное обновление
  //     }
  //   });
  // }
  updatePoint(updatedPoint) {
    this.points.find((point) => {
      if(point.id === updatedPoint.id) {
        Object.assign(point, updatedPoint);
      }
    });
  }
}

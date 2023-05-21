export default class DestinationsModel{
  constructor(service){
    this.service = service;
    this.destination = this.service.getDestinations();
  }

  get(){
    return this.destination;
  }

  getById(idDestination){
    return this.destination.find((element)=> {
      if(idDestination === element.id){
        return element;
      }
    });
  }
}

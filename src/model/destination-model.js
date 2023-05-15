export default class DestinationsModel{
  constructor(service){
    this.service = service;
    this.destination = this.service.getDestinations();
  }

  get(){
    return this.destination;
  }

  getById(idDestination){
    return this.destination.find((id)=> {
      if(idDestination === id.id){
        return id;
      }
    });
  }
}

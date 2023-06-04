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

  updateDestination(updatedDestination) {
    this.destination.find((destination) => {
      if(destination.id === updatedDestination.id) {
        Object.assign(destination, updatedDestination);
      }
    });
  }

}

export default class DestinationModel{

  #destinations = [];
  #service = null;
  constructor(service){
    this.#service = service;
  }

  get destinations(){
    return this.#destinations;
  }

  getById(idDestination){
    return this.#destinations.find((element)=> {
      if(idDestination === element.id){
        return element;
      }
    });
  }

  async init() {
    this.#destinations = await this.#service.getDestinations();
    return this.#destinations;
  }

}

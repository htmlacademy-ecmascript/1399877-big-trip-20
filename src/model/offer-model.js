export default class ModelOffer{
  constructor(service){
    this.service = service;
    this.offer = this.service.getOffers();
  }

  get(){
    return this.offer;
  }

  getByType(type){
    return this.offer.find((offer)=> offer.type === type);
  }
}

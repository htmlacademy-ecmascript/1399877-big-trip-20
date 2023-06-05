export default class OfferModel{
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

  updateOffer(updatedOffer) {
    this.offer.find((offer) => {
      if(offer.id === updatedOffer.id) {
        Object.assign(offer, updatedOffer);
      }
    });
  }
}

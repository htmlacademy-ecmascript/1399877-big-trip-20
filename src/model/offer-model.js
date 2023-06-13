export default class OfferModel{

  #offers = null;
  #service = null;

  constructor(service){
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get(){
    return this.#offers;
  }

  getByType(type){
    return this.#offers.find((offer)=> offer.type === type);
  }

  updateOffer(updatedOffer) {
    this.#offers.find((offer) => {
      if(offer.id === updatedOffer.id) {
        Object.assign(offer, updatedOffer);
      }
    });
  }
}

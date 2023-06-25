export default class OfferModel{

  #offers = [];
  #service = null;

  constructor(service){
    this.#service = service;
  }

  get offers(){
    return this.#offers;
  }

  getByType(type){
    return this.#offers.find((offer)=> offer.type === type);
  }

  async init() {
    this.#offers = await this.#service.getOffers();
    return this.#offers;
  }

}

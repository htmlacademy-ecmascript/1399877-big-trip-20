import { createPoint } from '../mock/points.js';
import {createDestination} from '../mock/destination.js';
import {createOffer} from '../mock/offers.js';
import {getRandomValue, getRandomInteger} from '../../src/utils.js';
import { TYPES } from '../const.js';


export default class CreatePointList {

  constructor(){
    this.offers = this.generateOffers();
    this.destinations = this.generateDestinations();
    this.points = this.generatePoints();
  }

  getOffers(){
    return this.offers;
  }

  getDestinations(){
    return this.destinations;
  }

  getPoints(){
    return this.points;
  }

  generateDestinations(){
    return Array.from({length: getRandomInteger(1,TYPES.length)}, createDestination);
  }

  generateOffers(){
    return TYPES.map((type)=>({
      type,
      offers: Array.from({length: getRandomInteger(1,3)},() => createOffer(type))
    }
    ));
  }

  generatePoints(){
    return Array.from({length: getRandomInteger(1, TYPES.length)}, () => {
      const type = getRandomValue(TYPES);
      const offerElement = this.offers.find((offerType) => offerType.type === type);
      const destinationId = getRandomValue(this.destinations).id;
      const offerId = offerElement.offers.map(({id})=> id);
      return createPoint(type, destinationId, offerId);
    }
    );
  }
}

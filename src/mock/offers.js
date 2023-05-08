import { getRandomInteger} from '../utils.js';
import { Price } from './const.js';

function createOffer(type){
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInteger(Price.MIN, (Price.MAX / 10))
  };
}

export {createOffer};

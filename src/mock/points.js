import { Price} from './const.js';
import { getRandomInteger,formatStringToDateTime } from '../utils.js';
import { getDate } from './utils.js';

function createPoint(type, desinationId, OfferId){
  return{
    id:crypto.randomUUID(),
    basePrice: getRandomInteger(1, Price.MAX),
    dateFrom: formatStringToDateTime(getDate(false)),
    dateTo: formatStringToDateTime(getDate(true)),
    destination: desinationId,
    isFavorite: !!getRandomInteger(0,1),
    offers: OfferId,
    type
  };
}

export {createPoint};

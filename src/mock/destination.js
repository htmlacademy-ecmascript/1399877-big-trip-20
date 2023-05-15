import { getRandomValue} from '../utils.js';
import {CITIES, DESCRIPTION} from './const.js';

function createDestination(){
  const city = getRandomValue(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: DESCRIPTION,
    picture: [{
      src: `https://loremflickr.com/300/200?random=${crypto.randomUUID()}.jpg`,
      description : `${city} ${DESCRIPTION}`
    }]
  };
}

export{createDestination};

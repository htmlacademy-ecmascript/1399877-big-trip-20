
import { filter } from '../utils/filter.js';

function generateFilters(points) {
  return Object.entries(filter)
    .map(([FilterType, filterPoints]) => ({
      type : FilterType,
      hasPoints : filterPoints(points).length > 0,
    }));
}

export {generateFilters};

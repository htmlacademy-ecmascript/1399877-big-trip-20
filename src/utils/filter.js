import { isDateFuture, isDatePast, isDatePresent } from './common.js';
import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING] : (points) => [...points],
  [FilterType.FUTURE] : (points) => points.filter((point) => isDateFuture(point)),
  [FilterType.PRESENT] : (points) => points.filter((point) => isDatePast(point)),
  [FilterType.PAST] : (points) => points.filter((point) => isDatePresent(point)),
};

export {filter};

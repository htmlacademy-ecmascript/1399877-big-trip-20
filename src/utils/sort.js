import { getPointsDateDifference, getPointsDurationDateDifference, getPointsPriceDateDifference} from './point.js';
import { SortType } from '../const.js';


const sort = {
  [SortType.DAY] : (points) => points.sort(getPointsDateDifference),
  [SortType.PRICE] : (points) => points.sort(getPointsPriceDateDifference),
  [SortType.TIME] : (points) => points.sort(getPointsDurationDateDifference),
  [SortType.EVENT] : () => {
    throw new Error(`Sort by ${SortType.EVENT} is not implemented`);
  },
  [SortType.OFFERS] : () => {
    throw new Error(`Sort by ${SortType.OFFERS} is not implemented`);
  },
};

export {sort};

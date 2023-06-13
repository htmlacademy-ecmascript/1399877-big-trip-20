
const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const enabledSortType = {
  [SortType.DAY] : true,
  [SortType.EVENT] : false,
  [SortType.TIME] : true,
  [SortType.PRICE] : true,
  [SortType.OFFERS] : false
};

const UserAction = {
  UPDATE_POINT : ' UPDATE_POINT',
  ADD_POINT : 'ADD_POINT',
  DELETE_POINT : 'DELETE_POINT'
};

const UpdateType = {
  PATCH : 'PATCH',
  MINOR : 'MINOR',
  MAJOR : 'MAJOR',
};

const templatePoint = {
  id : crypto.randomUUID(),
  basePrice : '',
  dateFrom : '',
  dateTo : '',
  destination : '',
  isFavorite : false,
  offers: '',
  type : '',

};


export {TYPES, FilterType, SortType, enabledSortType, UpdateType, UserAction, templatePoint};

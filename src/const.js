import dayjs from 'dayjs';

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
  INIT : 'INIT'
};


const PointMode = {
  VIEW: 'view',
  EDIT: 'edit',
};

const Method = {
  PUT : 'put',
  POST : 'post',
  DELETE : 'delete'
};

const DateFormat = {
  EVENT_DATE: 'MMM D',
  SHORT_EVENT_DATE: 'D',
  EVENT_EDIT_DATE: 'DD/MM/YY HH:mm',
  TIME: 'HH:mm',
  D_H_M_DURATION: 'DD[D] HH[H] mm[M]',
  H_M_DURATION: 'HH[H] mm[M]',
  M_DURATION: 'mm[M]'
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().add(2, 'D').toISOString(),
  isFavorite: false,
  offers: [],
  type: TYPES[0]
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

const MAX_CITIES_COUNT = 3;

export {
  TYPES,
  FilterType,
  SortType,
  enabledSortType,
  UpdateType,
  UserAction,
  PointMode,
  Method,
  DateFormat,
  BLANK_POINT,
  TimeLimit,
  MAX_CITIES_COUNT
};

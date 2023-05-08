import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

// const MSEC_IN_SEC = 1000;
// const SEC_IN_MIN = 60;
// const MIN_IN_HOUR = 60;
// const HOUR_IN_DAY = 24;

// const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
// const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

function getRandomInteger(a = 0, b = 1){
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomValue(items){
  return items[getRandomInteger(0, items.length - 1)];
}

function formatStringToDateTime(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

function formatStringToShortDate(date) {
  return dayjs(date).format('MMM DD');
}

export{getRandomInteger, getRandomValue,formatStringToDateTime,formatStringToShortDate};

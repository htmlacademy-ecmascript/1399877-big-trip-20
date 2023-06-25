import { DateFormat } from '../const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getDuration = (start, end) => dayjs.duration(dayjs(end).diff(dayjs(start)));

const formatDuration = (durationValue) => {
  if (durationValue.get('day')) {
    return durationValue.format(DateFormat.D_H_M_DURATION);
  }

  if (!durationValue.get('day') && durationValue.get('hour')) {
    return durationValue.format(DateFormat.H_M_DURATION);
  }

  return durationValue.format(DateFormat.M_DURATION);
};

function calculatePointDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function sortByDate(points) {
  return points.sort((a, b) => {
    const dateDiff = dayjs(a.dateFrom).unix() - dayjs(b.dateFrom).unix();
    return dateDiff;
  });
}

const escBehavior = (callback) => {
  const handler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      callback();
    }
  };

  return {
    add : () => document.addEventListener('keydown', handler),
    remove : () => document.removeEventListener('keydown', handler)
  };
};

function getRandomInteger(a = 0, b = 1){
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomValue(items){
  return items[getRandomInteger(0, items.length - 1)];
}

const isDateFuture = (dateFrom) => dayjs().isBefore(dateFrom);

const isDatePast = (dateTo) => dayjs().isAfter(dateTo);

const isDatePresent = (dateFrom, dateTo) => dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo);


export {
  getDuration,
  formatDuration,
  getRandomValue,
  isDateFuture,
  isDatePast,
  isDatePresent,
  escBehavior,
  calculatePointDueDate,
  sortByDate
};

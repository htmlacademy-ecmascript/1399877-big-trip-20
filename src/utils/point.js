import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

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

function formatStringShorTime(date){
  return dayjs(date).format('HH:mm');
}
function callcDate(dateFrom,dateTo){
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
  const diff = to.diff(from,'hours', true);
  return dayjs.duration(diff, 'hours').format('HH:mm');
}

function isPointFuture(point){
  return dayjs().isBefore(point.dateFrom);
}

function isPointPresent(point){
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateFrom);
}

function isPointPast(point){
  return dayjs().isAfter(point.dateFrom);
}

function getPointsDateDifference (pointA, pointB){
  return new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
}

function getPointsDurationDateDifference (pointA, pointB){
  const durationA = new Date(pointA.dateTo) - new Date(pointA.dateFrom);
  const durationB = new Date(pointB.dateTo) - new Date(pointB.dateFrom);

  return durationB - durationA;
}

function getPointsPriceDateDifference (pointA, pointB){
  return pointB.basePrice - pointA.basePrice;
}

const getPointTemplate = () => ({
  id : crypto.randomUUID(),
  basePrice : '',
  dateFrom : '',
  dateTo : '',
  destination : '',
  isFavorite : false,
  offers: '',
  type : '',
});


export{
  getPointTemplate,
  getRandomInteger,
  getRandomValue,
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringShorTime,
  callcDate,
  isPointFuture,
  isPointPresent,
  isPointPast,
  getPointsDateDifference,
  getPointsDurationDateDifference,
  getPointsPriceDateDifference
};

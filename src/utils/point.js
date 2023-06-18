
// function formatStringToDateTime(date) {
//   return dayjs(date).format('YYYY-MM-DDTHH:mm');
// }

// function formatStringToShortDate(date) {
//   return dayjs(date).format('MMM DD');
// }

// function formatStringShorTime(date){
//   return dayjs(date).format('HH:mm');
// }
// function callcDate(dateFrom,dateTo){
//   const from = dayjs(dateFrom);
//   const to = dayjs(dateTo);
//   const diff = to.diff(from,'hours', true);
//   return dayjs.duration(diff, 'hours').format('HH:mm');
// }

// function isPointFuture(point){
//   return dayjs().isBefore(point.dateFrom);
// }

// function isPointPresent(point){
//   return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateFrom);
// }

// function isPointPast(point){
//   return dayjs().isAfter(point.dateFrom);
// }

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
  getPointsDateDifference,
  getPointsDurationDateDifference,
  getPointsPriceDateDifference
};

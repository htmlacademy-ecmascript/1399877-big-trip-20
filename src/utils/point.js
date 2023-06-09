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

export{
  getPointsDateDifference,
  getPointsDurationDateDifference,
  getPointsPriceDateDifference
};

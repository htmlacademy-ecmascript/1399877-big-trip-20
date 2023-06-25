import AbstractView from '../framework/view/abstract-view.js';
import { calculatePointDueDate } from '../utils/common.js';
import { MAX_CITIES_COUNT } from '../const.js';
import dayjs from 'dayjs';

function calculateTotalPrice(points, offers) {
  let totalPrice = 0;

  for(let i = 0; i < points.length; i++) {
    if(points[i].offers.length) {
      const offersType = offers.find((offer) => points[i].type === offer.type);
      for(let j = 0; j < points[i].offers.length;j++){
        const offerPrice = offersType.offers.find((offer) => points[i].offers[j] === offer.id);
        totalPrice += offerPrice.price;
      }
    }
    totalPrice += points[i].basePrice;
  }
  return totalPrice;
}

function createTitleTemplate(points, firstDestination, lastDestination, firstDate, lastDate, shortPoints) {
  return (`<div class="trip-info__main">
    <h1 class="trip-info__title">
    ${points.length > MAX_CITIES_COUNT ? `${firstDestination ? firstDestination : ''} &mdash; . . . &mdash;
    ${lastDestination ? lastDestination : ''}` : shortPoints.join(' &mdash; ')}
    </h1>

    <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
  </div>`);
}

function createTotalPriceTemplate(totalPrice) {
  return (`<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice ? totalPrice : ''}</span>
</p>`);
}

function createInfoViewTemplate(data) {
  const {points, offers, destinations, shortPoints} = data;

  const firstDestination = destinations.find((element) => points[0].destination === element.id).name;
  const lastDestination = destinations.find((element) => points[points.length - 1].destination === element.id).name;
  const isSameMonth = dayjs(points[0]?.dateFrom).month() === dayjs(points[points.length - 1]?.dateTo).month();
  const firstDate = calculatePointDueDate(points[0]?.dateFrom, `${isSameMonth ? 'MMM D' : 'D MMM'}`);
  const lastDate = calculatePointDueDate(points[points.length - 1]?.dateTo, `${isSameMonth ? 'D' : 'D MMM'}`);
  const totalPrice = calculateTotalPrice(points,offers);


  return (`<section class="trip-main__trip-info  trip-info">
  ${createTitleTemplate(points, firstDestination, lastDestination, firstDate, lastDate, shortPoints)}
  ${createTotalPriceTemplate(totalPrice)}
  </section>`);
}

export default class InfoView extends AbstractView{

  #points = null;
  #offers = null;
  #destinations = null;
  #shortPoints = null;

  constructor({pointsModel, offersModel, destinationsModel, shortPoints}) {
    super();

    this.#points = pointsModel;
    this.#offers = offersModel;
    this.#destinations = destinationsModel;
    this.#shortPoints = shortPoints;
  }

  get template() {
    return createInfoViewTemplate({
      points : this.#points,
      offers : this.#offers,
      destinations : this.#destinations,
      shortPoints : this.#shortPoints
    });
  }
}


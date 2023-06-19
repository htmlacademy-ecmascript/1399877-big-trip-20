import AbstractView from '../framework/view/abstract-view.js';
import {formatDuration, getDuration} from '../utils/common.js';
import dayjs from 'dayjs';


function createEventsItemViewTemplate(data){
  const {point, destination, offers} = data;

  const startDay = dayjs(point.dateFrom).format('MMM D');
  const startDayDateTime = dayjs(point.dateFrom).format('YYYY-MM-DD');
  const startTime = dayjs(point.dateFrom).format('HH:mm');
  const startTimeDateTime = dayjs(point.dateFrom).format('YYYY-MM-DDTHH:mm');
  const endTime = dayjs(point.dateTo).format('HH:mm');
  const endTimeDateTime = dayjs(point.dateTo).format('YYYY-MM-DDTHH:mm');

  const eventDuration = formatDuration(getDuration(point.dateFrom, point.dateTo));

  const offersItemsList = offers?.offers?.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${point.offers?.some((offerId) => offerId === offer.id) ? offer.title : ''}</span>
        ${point.offers?.some((offerId) => offerId === offer.id) ? ' &plus; &euro;&nbsp;' : ''}
        <span class="event__offer-price">${point.offers?.some((offerId) => offerId === offer.id) ? offer.price : ''}</span>
      </li>
`).join('');
  return(`            <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${startDayDateTime}">${startDay}</time>
    <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
      <time class="event__start-time" datetime="${startTimeDateTime}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${endTimeDateTime}">${endTime}</time>
      </p>
      <p class="event__duration">${eventDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offersItemsList}
    </ul>
    <button class="event__favorite-btn${point.isFavorite ? ' event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
}

export default class EventsView extends AbstractView{

  #destination;
  #offers;
  #point;

  constructor({point, destination, offers}){
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  get template() {
    return createEventsItemViewTemplate({
      point : this.#point,
      destination : this.#destination,
      offers : this.#offers,
    });
  }

  setEditHandler(cb){
    this.element.addEventListener('click',(evt)=>{
      evt.preventDefault();
      if(evt.target.closest('.event__rollup-btn')){
        cb();
      }
    });
  }

  setEditHandlerKey(cb){
    this.element.addEventListener('keydown',(evt)=>{
      evt.preventDefault();
      if(evt.target.key === 'ArrowUp'){
        cb();
      }
    });
  }

  setFavoriteHandler(cb){
    this.element.addEventListener('click',(evt) => {
      evt.preventDefault();
      if(evt.target.closest('.event__favorite-icon')){
        cb();
      }
    });
  }
}


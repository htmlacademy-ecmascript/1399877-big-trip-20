import AbstractView from '../framework/view/abstract-view.js';
import {formatStringToShortDate,formatStringShorTime, callcDate} from '../utils.js';


function createEventsItemViewTemplate(data){
  const {point, pointDestination, pointOffers} = data;
  const offersItemsList = pointOffers?.offers?.map((pointOffer) => `
<li class="event__offer">
        <span class="event__offer-title">${pointOffer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${pointOffer.price}</span>
      </li>
`).join('');
  return(`            <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${point.dateFrom}">${formatStringToShortDate(point.dateFrom)}</time>
    <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${pointDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${point.dateFrom}">${formatStringShorTime(point.dateFrom)}</time>
        &mdash;
        <time class="event__end-time" ${point.dateFrom}">${formatStringShorTime(point.dateTo)}</time>
      </p>
      <p class="event__duration">${callcDate(point.dateFrom ,point.dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${pointOffers.offers[0].price}</span>
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
  #data = null;
  constructor(data){
    super();
    this.#data = data;
  }

  get template() {
    return createEventsItemViewTemplate(this.#data);
  }

  setEditHandler(cb){
    this.element.addEventListener('click',(evt)=>{
      evt.preventDefault();
      if(evt.target.closest('.event__rollup-btn')){
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


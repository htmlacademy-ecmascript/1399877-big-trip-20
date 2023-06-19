import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { BLANK_POINT, TYPES } from '../const.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createOffersMarkup = (typeOffers, offers, isDisabled) => typeOffers.map((offer) => {
  const checked = offers.includes(offer.id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.id}"
        type="checkbox"
        value="${offer.id}"
        name="event-offer-${offer.id}"
        ${checked}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`);
}).join('');

const createOffersTemplate = (typeOffers, offers) => {
  if (!typeOffers.length) {
    return '';
  }

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${createOffersMarkup(typeOffers, offers)}
      </div>
    </section>
  `);


};


const createEventPhotosTemplate = (picturesList) => {
  if (!picturesList.length) {
    return '';
  }

  return (`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesList.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo.">`).join('')}
      </div>
    </div>`);
};

const createDestinationTemplate = (destinationItem) => {
  if (!destinationItem) {
    return '';
  }

  return (/*html*/`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationItem.description}</p>
      ${createEventPhotosTemplate(destinationItem.pictures)}
    </section>`);
};

const createPointEditTemplate = (data) => {

  const {point, destinations , offers, isNew, isDisabled, isSaving, isDeleting} = data;
  const currentDestination = destinations.find((destination) => destination.id === point.destination);

  const timeFrom = dayjs(point.dateFrom).format('DD/MM/YY HH:mm');
  const timeTo = dayjs(point.dateTo).format('DD/MM/YY HH:mm');

  const deleteButton = isDeleting ? 'Deleting...' : 'Delete';

  const descriptionTitles = destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

  const currentOffers = offers.find((offer) => offer.type === point.type)?.offers ?? [];

  const typeList = (type) => TYPES.map((typeEvent) => {
    const isChecked = typeEvent === type ? 'checked' : '';

    return (`
        <div class="event__type-item">
          <input
            id="event-type-${typeEvent}-1"
            class="event__type-input  visually-hidden"
            type="radio"
            name="event-type"
            value="${typeEvent}" ${isChecked}
          >
          <label
            class="event__type-label event__type-label--${typeEvent}"
            for="event-type-${typeEvent}-1">${typeEvent}
          </label>
        </div>`);
  }).join('');

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typeList(point.type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination?.name || ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
          ${descriptionTitles}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}" ${isDisabled ? 'disabled' : ''}>
      </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isNew ? 'Cancel' : deleteButton}</button>
        ${isNew ? '' : '<button class="event__rollup-btn" type="button">'}
      </header>
      <section class="event__details">
      ${createOffersTemplate(currentOffers, point.offers)}

      ${createDestinationTemplate(currentDestination)}
      </section>
    </form>
  </li>`);

};


export default class EventEdit extends AbstractStatefulView {

  #handelSave = null;
  #handelCansel = null;

  #destinations = null;
  #offers = null;

  #datepickerFrom = null;
  #datepickerTo = null;
  #handelDeleteClick = null;

  #isNew = false;

  constructor({point = BLANK_POINT, destinations, offers, onSave, onDelete, handelCansel, isNew = false}){
    super();
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handelSave = onSave;
    this.#handelCansel = handelCansel;
    this._setState(EventEdit.parsePointToState({point}));
    this.#handelDeleteClick = onDelete;

    this.#isNew = isNew;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate({
      destinations : this.#destinations,
      offers : this.#offers,
      ...this._state,
      isNew : this.#isNew
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom && this.#datepickerTo) {
      this.#datepickerFrom.destroy();
      this.#datepickerTo.destroy();

      this.#datepickerFrom = null;
      this.#datepickerTo = null;
    }
  }

  reset (point) {
    this.updateElement(
      EventEdit.parsePointToState(point),
    );
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      point: {
        ...this._state.point,
        basePrice: Number(evt.target.value),
      }
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handelSave(EventEdit.parseStateToPoint(this._state));
  };

  #onCancelButtonClick = (evt) => {
    evt.preventDefault();
    this.#handelCansel();
  };


  setCancelHandler(cb) {
    this.#handelCansel = cb;
  }

  #typeChangeHandler = (evt) => {
    this._state.point.type = evt.target.value;

    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers : []
      }
    });
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();

    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point : {
        ...this._state.point,
        offers : checkedBoxes.map((element) => element.value)
      }
    });
  };

  #destinationListChangeHandler = (evt) => {
    if (evt.target.value === '') {
      return;
    }

    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

    if (selectedDestination) {
      this.updateElement({
        point: {
          ...this._state.point,
          destination: selectedDestination.id,
        }
      });
    }
  };


  _restoreHandlers(){
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);

    if (this.#isNew) {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#formCancelHandler);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCancelButtonClick);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationListChangeHandler);

    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    this.element.querySelector('.event__section--offers')?.addEventListener('change', this.#offerClickHandler);


    this.#setDatepickerFrom();
    this.#setDatepickerTo();

  }

  #formCancelHandler = (evt) => {
    evt.preventDefault();
    this.#handelCansel();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handelDeleteClick(EventEdit.parseStateToPoint(this._state));
  };


  #dateFromChangeHandler = ([userDate]) => {
    let dateTo = this._state.point.dateTo;
    if (new Date(dateTo) < new Date(userDate)) {
      dateTo = userDate;
    }
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: userDate,
        dateTo
      }
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: userDate,
      }
    });
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: 'today',
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dateFromChangeHandler,
        'time_24hr': true,
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.point.dateFrom,
        defaultDate: this._state.point.dateTo,
        onChange: this.#dateToChangeHandler,
        'time_24hr': true,
      },
    );
  }


  static parsePointToState = (point) =>
    ({ ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

  static parseStateToPoint = (state) => {
    delete state.isDisabled;
    delete state.isSaving;
    delete state.isDeleting;

    return state.point;
  };
}


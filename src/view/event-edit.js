import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createItemEvent(data){
  const {point, destinationsModel, offersModel} = data;
  const dataList = destinationsModel.map((element)=>`<option value="${element.name}"></option>`).join('');
  const destinationsItemsList = destinationsModel?.map((element) => `<img class="event__photo" src="${element.picture[0].src}" alt="${element.picture[0].description}">`).join('');
  return (`            <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=""
        list="destination-list-1">
        <datalist id="destination-list-1">
        ${dataList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${offersModel.offers[0].price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">Add luggage</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">30</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">Switch to comfort class</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">100</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
          <label class="event__offer-label" for="event-offer-meal-1">
            <span class="event__offer-title">Add meal</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">15</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
          <label class="event__offer-label" for="event-offer-seats-1">
            <span class="event__offer-title">Choose seats</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">5</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
          <label class="event__offer-label" for="event-offer-train-1">
            <span class="event__offer-title">Travel by train</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">40</span>
          </label>
        </div>
      </div>
    </section>
  </section>
    <section class="event__details">
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${point.type}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
           ${destinationsItemsList}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`);
}

export default class EventEdit extends AbstractStatefulView {

  #data = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;


  constructor({point, destinationsModel, offersModel}){
    super();
    this.#point = point;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this._setState(EventEdit.parsePointToState(this.#data = {
      point : this.#point,
      destinationsModel: this.#destinationsModel.get(),
      offersModel : this.#offersModel.getByType(this.#point.type),
    }
    ));

    this._restoreHandlers();
  }

  get template() {
    return createItemEvent(this._state);
  }

  setCancelHanlder(cb){
    this.element.querySelector('.event__reset-btn').addEventListener('click',(evt)=>{
      evt.preventDefault();
      cb();
    });
  }

  #updateState = (evt) => {
    evt.preventDefault();
    const submitUbdateState = () => {
      EventEdit.parseStateToPoint(this._state);

      this.element.querySelector('.event__save-btn').removeEventListener('click', submitUbdateState);
    };
    this.element.querySelector('.event__save-btn').addEventListener('click', submitUbdateState);
    this.#setPoint(this._state);
  };

  #setTypeHandler = (evt) => {
    this._state.point.type = evt.target.value;
    this._state.offersModel = this.#offersModel.getByType(this._state.point.type);
    this.element.querySelector('.event__type-toggle').click();
    this.updateElement(this._state);
  };

  #setDestinationListHandler = (evt) => {
    evt.preventDefault();
    const destinationId = this._state.destinationsModel.find((element) => element.name === evt.target.value);
    this._state.point.destination = destinationId.id;
    this.updateElement(this._state);
  };

  _restoreHandlers(){
    this.element.addEventListener('submit', this.#updateState);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#setTypeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#updateState);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#setDestinationListHandler);
  }

  #setPoint = (point) => point;

  static parsePointToState = (data) => ({...data});

  static parseStateToPoint = (state) => state.data;
}


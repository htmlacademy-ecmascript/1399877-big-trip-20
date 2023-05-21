import AbstractView from '../framework/view/abstract-view.js';

const SortTypes = {
  day: 'Day',
  event: 'Event',
  time: 'Time',
  price: 'Price',
  offers: 'Offers'
};

function createSort(acteveType = 'event'){
  const types = Object.entries(SortTypes).map(([key,type])=>`
  <div class="trip-sort__item  trip-sort__item--${key}">
  <input id="sort-${key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${key}"${(acteveType === key) ? ' checked' : ''}>
  <label class="trip-sort__btn" for="sort-${key}">${type}</label>
</div>`);
  return(`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${types.join('')}
  </form>`);
}

export default class FormSort extends AbstractView{

  get template() {
    return createSort();
  }
}

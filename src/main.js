import {render, RenderPosition} from './render.js';
import {templateHeaderSeaction,price} from './view/trip-info.js';
import TripFilter from './view/trip-filters.js';
import NewFormSort from './view/sort-main.js';

import EventPresenter from './presenter/trip-event-presenter.js';


const headerElement = document.querySelector('.trip-main');
const eventPresenter = new EventPresenter({listContainer: document.querySelector('.trip-events')});

render(templateHeaderSeaction, headerElement,RenderPosition.AFTERBEGIN);

render(price,document.querySelector('.trip-main__trip-info'),RenderPosition.BEFOREEND);

render(new TripFilter(), document.querySelector('.trip-controls__filters'),RenderPosition.AFTEREND);
render(new NewFormSort(),document.querySelector('.trip-events'));

eventPresenter.init();


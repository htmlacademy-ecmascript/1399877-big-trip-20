import {render, RenderPosition} from './render.js';
import InfoView from './view/main-info-view.js';
import TripFilter from './view/trip-filters.js';
import FormSort from './view/sort-main.js';
import EventPresenter from './presenter/trip-event-presenter.js';

const eventPresenter = new EventPresenter({listContainer: document.querySelector('.trip-events')});

render(new InfoView(), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
render (new TripFilter(), document.querySelector('.trip-main'));
render(new FormSort(),document.querySelector('.trip-events'));


eventPresenter.init();


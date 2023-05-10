import {render, RenderPosition} from './render.js';
import InfoView from './view/main-info-view.js';
import TripFilter from './view/trip-filters.js';
import FormSort from './view/sort-main.js';
import EventPresenter from './presenter/trip-event-presenter.js';
import CreatePointList from './service/service.js';
import ModelPoint from './model/point-model.js';
import ModelOffer from './model/offer-model.js';
import ModelDestinatios from './model/destination-model.js';


const mockService = new CreatePointList();
const mockPoint = new ModelPoint(mockService);
const mockOffer = new ModelOffer(mockService);
const mockDestination = new ModelDestinatios(mockService);

const eventPresenter = new EventPresenter({listContainer: document.querySelector('.trip-events')},mockPoint,mockOffer,mockDestination);

render(new InfoView(), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
render (new TripFilter(), document.querySelector('.trip-main'));
render(new FormSort(),document.querySelector('.trip-events'));

eventPresenter.init();

// console.log(mockOffer.getByType(mockPoint.get()[0].type))

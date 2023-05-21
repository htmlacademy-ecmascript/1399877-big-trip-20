import {render, RenderPosition} from './framework/render.js';
import InfoView from './view/main-info-view.js';
import TripFilter from './view/trip-filters.js';
import FormSort from './view/sort-main.js';
import EventPresenter from './presenter/trip-event-presenter.js';
import CreatePointList from './service/service.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationsModel from './model/destination-model.js';
import PointPresentor from './presenter/point-presentor.js';

const mockService = new CreatePointList();
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

// const pointPresentor = new PointPresentor({
//   listContainer: document.querySelector('.trip-events'),
//   pointsModel: pointsModel,
//   offersModel: offersModel,
//   destinationsModel: destinationsModel
// });

const eventPresenter = new EventPresenter({
  listContainer: document.querySelector('.trip-events'),
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});

render(new InfoView(), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
render (new TripFilter(), document.querySelector('.trip-main'));
render(new FormSort(),document.querySelector('.trip-events'));

eventPresenter.init();



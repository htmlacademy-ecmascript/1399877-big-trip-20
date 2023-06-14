import {render, RenderPosition} from './framework/render.js';
import InfoView from './view/main-info-view.js';
import EventPresenter from './presenter/trip-event-presenter.js';
import CreatePointList from './service/service.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationsModel from './model/destination-model.js';

const mockService = new CreatePointList();
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const filterConteiner = document.querySelector('.trip-main');

const eventPresenter = new EventPresenter({
  listContainer: document.querySelector('.trip-events'),
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  filterConteiner : filterConteiner
});

render(new InfoView(), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);

eventPresenter.init();



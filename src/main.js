import {render, RenderPosition} from './framework/render.js';
import InfoView from './view/main-info-view.js';
import EventPresenter from './presenter/trip-event-presenter.js';
// import CreatePointList from './service/service.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationsModel from './model/destination-model.js';
import PointsApiService from './service/points-api-service.js';

const AUTHORIZATION = 'Basic ao7k590it12345z';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
// const mockService = new CreatePointList();
const offersModel = new OfferModel(pointsApiService);
const destinationsModel = new DestinationsModel(pointsApiService);
const pointsModel = new PointModel({
  service : pointsApiService,
  offersModel,
  destinationsModel
});
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



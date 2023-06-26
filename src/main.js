import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import EventPresenter from './presenter/event-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import PointsApiService from './service/points-api-service.js';

const AUTHORIZATION = 'Basic ao7k590it12345z';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const filterConteiner = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-main');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const offersModel = new OfferModel(pointsApiService);
const destinationsModel = new DestinationModel(pointsApiService);
const pointsModel = new PointModel({
  service : pointsApiService,
  offersModel,
  destinationsModel
});

const eventPresenter = new EventPresenter({
  listContainer: document.querySelector('.trip-events'),
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel,
  filterConteiner : filterConteiner,
  onNewPointDestroy: handleNewPointFormClose,
  infoViewContainer : mainContainer
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose(){
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick(){
  newPointButtonComponent.element.disabled = true;
  eventPresenter.createPoint();
}

eventPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, mainContainer);
  });



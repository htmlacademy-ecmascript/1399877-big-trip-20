import { render, replace } from '../framework/render.js';
import EventsView from '../view/event-view.js';
import EventEdit from '../view/event-edit.js';

const PointMode = {
  VIEW: 'view',
  EDIT: 'edit',
};

export default class PointPresenter{

  #eventsListView = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointData = null;
  #pointViewComponent = null;
  #pointEditComponent = null;
  #handleEditModeChange = null;
  #handleDataChange = null;
  #mode = PointMode.VIEW;
  #modeFavorite = null;
  #openFavoritModeHandler = null;
  #changeFavorite = null;


  constructor({eventsListView, offersModel, destinationsModel, onDataChange}) {
    this.#eventsListView = eventsListView;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
  }

  #createViewModeComponent(point) {
    const pointView = new EventsView({
      point,
      pointDestination : this.#destinationsModel.getById(point.destination),
      pointOffers : this.#offersModel.getByType(point.type),
    });

    pointView.setEditHandler(this.openEditMode);
    pointView.setEditHandlerKey(this.openEditMode);
    pointView.setFavoriteHandler(this.changeFavorite);

    return pointView;
  }

  #createEditModeComponent(point) {
    const pointEdit = new EventEdit ({
      point,
      pointDestinations : this.#destinationsModel.get(),
      pointOffers : this.#offersModel.get(),
    });

    pointEdit.setCancelHanlder(this.closeEditMode);
    return pointEdit;
  }

  #renderOrReplace(view) {
    const currentView = this.#mode === PointMode.VIEW ? this.#pointViewComponent : this.#pointEditComponent;
    if (currentView) {
      replace(view, currentView);
    } else {
      render(view, this.#eventsListView.element);
    }
  }

  #renderEditMode() {
    const view = this.#createEditModeComponent(this.#pointData);
    this.#renderOrReplace(view);
    this.#pointEditComponent = view;
    this.#mode = PointMode.EDIT;
  }

  #renderViewMode() {
    const view = this.#createViewModeComponent(this.#pointData);
    this.#renderOrReplace(view);

    this.#pointViewComponent = view;
    this.#mode = PointMode.VIEW;
  }


  openEditMode = () =>{
    if(this.#mode === PointMode.VIEW){
      this.#renderEditMode();
      this.#handleEditModeChange?.();
    }
  };

  setOpenEditModeHandler = (cb) =>{
    this.#handleEditModeChange = cb;
  };

  closeEditMode = () => {
    if(this.#mode === PointMode.EDIT){
      this.#renderViewMode();
    }
  };

  escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape'){
      evt.preventDefault();
      this.closeEditMode();
      document.removeEventListener('keydown', this.escKeyDownHandler);
    }
  };

  changeFavorite = () => {
    this.#handleDataChange({
      ...this.#pointData,
      isFavorite: !this.#pointData.isFavorite
    });
  };

  init(pointData) {
    this.#pointData = pointData;
    if (this.#mode === PointMode.VIEW) {
      this.#renderViewMode();
    } else {
      this.#renderEditMode();
    }
  }

}

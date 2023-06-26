import { UpdateType, UserAction } from '../const.js';
import { RenderPosition } from '../framework/render.js';
import EventEdit from '../view/event-edit.js';
import { render, remove } from '../framework/render.js';
import { getEscHandlers } from '../utils/common.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handlePointChange = null;
  #handleDestroy = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointEditComponent = null;
  #escControl = null;

  constructor({pointListContainer, offersModel, destinationsModel, onPointChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#handlePointChange = onPointChange;
    this.#handleDestroy = onDestroy;
    this.#escControl = getEscHandlers(() => this.destroy());
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EventEdit({
      destinations : this.#destinationsModel.destinations,
      offers : this.#offersModel.offers,
      onSave : this.#editFormSubmit,
      handelCansel : this.#editFormDelete,
      isNew : true,
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    this.#escControl.add();
  }

  destroy() {
    if (this.#pointEditComponent === null){
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    this.#escControl.remove();
  }

  setSaving(){
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #editFormSubmit = (point) => {
    this.#handlePointChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #editFormDelete = () => {
    this.destroy();
  };
}

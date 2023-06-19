import AbstractView from '../framework/view/abstract-view.js';

const createLoadingViewTemplate = () => (
  `<p class="trip-events__msg">
      Loading...
    </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingViewTemplate();
  }
}

import $ from 'jquery';
import SliderController from './Presenter/sliderPresenter';

declare global {
  interface JQuery {
    sliderPlugin(this: JQuery<HTMLElement>, slider: HTMLElement, options: Init): JQuery;
    setSlider(action: Actions, params: Params): void;
    getState(): Init;
  }
}

$.fn.sliderPlugin = function (this: JQuery<HTMLElement>, slider: HTMLElement, options: Init): JQuery {
  const controller = new SliderController(slider, options);
  
  const setSlider = function (action: Actions, params: Params) {
    controller.setSlider(action, params);
  };
  this.setSlider = setSlider;

  const getState = function () {
    return controller.getState();
  };
  this.getState = getState;
  
  return this;
};

function sliderCreate(slider: HTMLElement, params: Init) {
  return $(slider).sliderPlugin(slider, params);
}

export default sliderCreate;

import $ from 'jquery';
import SliderController from './Controller/sliderController';

$.fn.sliderPlugin = function (this: JQuery, slider: HTMLElement, options: Init): JQuery {
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

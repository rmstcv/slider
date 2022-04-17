import $ from 'jquery';
import SliderController from './sliderController';

$.fn.sliderPlugin = function (this: JQuery, slider: HTMLElement, options: Init): JQuery {
  const controller = new SliderController(slider, options);
  controller.init();
  const setValues = function ([min, max]: number[]) {
    controller.setModelValues([min, max]);
  };
  this.setValues = setValues;
  const getValues = function () {
    return controller.getModelValues();
  };
  this.getValues = getValues;
  const getStep = function () {
    return controller.initController.step;
  };
  this.getStep = getStep;
  const setStep = function (step: number) {
    controller.setStep(step);
  };
  this.setStep = setStep;
  
  return this;
};

function sliderCreate(slider: HTMLElement, params: Init) {
  return $(slider).sliderPlugin(slider, params);
}

export default sliderCreate;

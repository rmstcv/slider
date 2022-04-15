import $ from 'jquery';
import SliderController from './sliderController';

interface Init {
  sliderLength: number,
  min: number,
  max: number,
  step: number,
  setMin: number,
  setMax: number,
  sliderType: 'range' | 'single',
  orientation?: 'vertical' | 'horizontal',
  scale?: boolean,
  toolTip: boolean
}

$.fn.sliderPlugin = function (slider: HTMLElement, options: Init) {
  const controller = new SliderController(slider as HTMLElement, options as Init);
  controller.init();
  const setValues = function ([min, max]: number[]) {
    controller.updateSlider([min, max]);
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
  
  return this;
};

function sliderCreate(slider: HTMLElement, params: object) {
  return $(slider).sliderPlugin(slider, params);
}

export default sliderCreate;

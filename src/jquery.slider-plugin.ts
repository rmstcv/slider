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
  return this;
};

const slider = document.querySelector('.slider');
const plug = $('.slider').sliderPlugin(slider, {
  min: 0,
  max: 30,
  step: 2,
  setMin: 4,
  setMax: 16,
  sliderType: 'range',
  orientation: 'horizontal',
  scale: true,
  toolTip: true,
});

plug.init();






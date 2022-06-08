import './style.scss';
import ConfigPanel from './configPanel';
import sliderCreate from './jquery.slider-plugin';

const slider = document.querySelector('.slider') as HTMLElement;
const config = document.querySelector('.config') as HTMLElement;
const initOptions = {
  max: 10,
  step: 1,
};
const rangeSlider = sliderCreate(slider, initOptions);
(() => new ConfigPanel(rangeSlider, config, slider))();
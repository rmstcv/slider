import './style.scss';
import ConfigPanel from './configPanel/configPanel';
import sliderCreate from './Slider/jquery.slider-plugin';

const sliderFirst = document.querySelector('.slider-first') as HTMLElement;
const configFirst = document.querySelector('.config') as HTMLElement;
const initOptions = {
  max: 10,
  step: 1,
};
const rangeSlider = sliderCreate(sliderFirst, initOptions);
(() => new ConfigPanel(rangeSlider, configFirst, sliderFirst))();
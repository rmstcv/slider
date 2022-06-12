import './style.scss';
import ConfigPanel from './configPanel/configPanel';
import sliderCreate from './Slider/jquery.slider-plugin';

const sliderFirstElem = document.querySelector('.slider-first') as HTMLElement;
const configFirst = document.querySelector('.config-first') as HTMLElement;
const initOptionsFirst = {
  max: 10,
  step: 1,
};
const sliderFirst = sliderCreate(sliderFirstElem, initOptionsFirst);
(() => new ConfigPanel(sliderFirst, configFirst))();

const sliderSecondElem = document.querySelector('.slider-second') as HTMLElement;
const configSecond = document.querySelector('.config-second') as HTMLElement;
const initOptionsSecond = {
  max: 10,
  step: 1,
};
const sliderSecond = sliderCreate(sliderSecondElem, initOptionsSecond);
(() => new ConfigPanel(sliderSecond, configSecond))();
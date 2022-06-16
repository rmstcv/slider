import './style.scss';
import ConfigPanel from './configPanel/configPanel';
import sliderCreate from './Slider/jquery.slider-plugin';

const sliderFirstElem = document.querySelector('.slider-first') as HTMLElement;
const configFirst = document.querySelector('.config-first') as HTMLElement;
const initOptionsFirst: UserInit = {
  max: 10,
  step: 1,
};
const sliderFirst = sliderCreate(sliderFirstElem, initOptionsFirst);
(() => new ConfigPanel(sliderFirst, configFirst))();

const sliderSecondElem = document.querySelector('.slider-second') as HTMLElement;
const configSecond = document.querySelector('.config-second') as HTMLElement;
const initOptionsSecond: UserInit = {
  min: -0.1,
  max: 0.1,
  step: 0.0005,
  valueFrom: -0.05,
  valueTo: 0.05,
  type: 'single',
  scale: false,
};
const sliderSecond = sliderCreate(sliderSecondElem, initOptionsSecond);
(() => new ConfigPanel(sliderSecond, configSecond))();

const sliderThirdElem = document.querySelector('.slider-third') as HTMLElement;
const configThird = document.querySelector('.config-third') as HTMLElement;
const initOptionsThird: UserInit = {
  min: -10,
  max: 10,
  step: 1,
  valueFrom: -5,
  valueTo: 5,
  type: 'range',
  orientation: 'vertical',
  scale: true,
  toolTip: true,
};
const sliderThird = sliderCreate(sliderThirdElem, initOptionsThird);
(() => new ConfigPanel(sliderThird, configThird))();

const sliderFourthElem = document.querySelector('.slider-fourth') as HTMLElement;
const configFourth = document.querySelector('.config-fourth') as HTMLElement;
const initOptionsFourth: UserInit = {
  min: -0.1,
  max: 0.1,
  step: 0.0005,
  valueFrom: -0.05,
  valueTo: 0.05,
  type: 'single',
  orientation: 'vertical',
  scale: false,
};
const sliderFourth = sliderCreate(sliderFourthElem, initOptionsFourth);
(() => new ConfigPanel(sliderFourth, configFourth))();
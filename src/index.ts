import './style.scss';
import sliderInitConfig from './sliderInitConfig';
import ConfigPanel from './configPanel';
import sliderCreate from './jquery.slider-plugin';

const slider = document.querySelector('.slider') as HTMLElement;
const config = document.querySelector('.config') as HTMLElement;

const rangeSlider = sliderCreate(slider, sliderInitConfig);
const configPanel = () => new ConfigPanel(rangeSlider, config, slider);
configPanel();
import sliderCreate from './jquery.slider-plugin';
import searchElem from './searchElem';

const sliderInitConfig: Init = {
  min: 0,
  max: 30,
  step: 2,
  setMin: 4,
  setMax: 16,
  sliderType: 'range',
  orientation: 'horizontal',
  scale: true,
  toolTip: true,
};

const slider = document.querySelector('.slider') as HTMLElement;
const config = document.querySelector('.config') as HTMLElement;
const rangeSlider = sliderCreate(slider, sliderInitConfig);

class ConfigPanel {

  lower: HTMLElement;

  upper: HTMLElement;

  minInput: HTMLInputElement;

  maxInput: HTMLInputElement;

  stepInput: HTMLInputElement;

  sliderInitConfig: Init;

  constructor(sliderElem: HTMLElement) {
    this.lower = <HTMLElement> searchElem('.slider__handle-lower', sliderElem);
    this.upper = <HTMLElement> searchElem('.slider__handle-upper', sliderElem);
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.sliderInitConfig = sliderInitConfig;
  }

  setMin() {
    this.minInput.setAttribute('step', rangeSlider.getStep());
    this.minInput.setAttribute('min', `${this.sliderInitConfig.min}`);
    this.minInput.value = rangeSlider.getValues()[0];
  }

  setMax() {
    this.maxInput.setAttribute('step', rangeSlider.getStep());
    this.maxInput.setAttribute('max', `${this.sliderInitConfig.max}`);
    this.maxInput.value = rangeSlider.getValues()[1];
  }

  setStep() {
    this.stepInput.value = `${this.sliderInitConfig.step}`;
  }

  addListeners() {
    document.addEventListener('mousemove', () => {
      this.minInput.value = rangeSlider.getValues()[0];
      this.maxInput.value = rangeSlider.getValues()[1];
    });
    this.minInput?.addEventListener('input', () => {
      rangeSlider.setValues([this.minInput.value, undefined]);
      this.minInput.setAttribute('max', `${this.upper?.getAttribute('data-upper')}`);
    });
    this.maxInput?.addEventListener('input', () => {
      rangeSlider.setValues([undefined, this.maxInput.value]);
      this.maxInput.setAttribute('min', `${this.lower?.getAttribute('data-lower')}`);
    });
  }

  init() {
    this.setMax();
    this.setMin();
    this.setStep();
    this.addListeners();
  }
}

const configPanel = new ConfigPanel(slider);
configPanel.init();
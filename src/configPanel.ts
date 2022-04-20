import sliderCreate from './jquery.slider-plugin';
import searchElem from './searchElem';

const sliderInitConfig: Init = {
  min: -30,
  max: 30,
  step: 5,
  setMin: -10,
  setMax: 10,
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

  step: number;

  orientation: HTMLInputElement;

  constructor(sliderElem: HTMLElement) {
    this.lower = <HTMLElement> searchElem('.slider__handle-lower', sliderElem);
    this.upper = <HTMLElement> searchElem('.slider__handle-upper', sliderElem);
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', config);
    this.sliderInitConfig = sliderInitConfig;
    this.step = this.sliderInitConfig.step;
  }

  setMin() {
    this.minInput.setAttribute('step', `${this.step}`);
    this.minInput.value = `${this.sliderInitConfig.setMin}`;
  }

  setMax() {
    this.maxInput.setAttribute('step', `${this.step}`);
    this.maxInput.value = `${this.sliderInitConfig.setMax}`;
  }

  setStep() {
    this.stepInput.value = `${this.step}`;
    this.stepInput.setAttribute('step', `${(this.sliderInitConfig.max - this.sliderInitConfig.min) / 20}`);
    this.stepInput.setAttribute('max', `${this.sliderInitConfig.max - this.sliderInitConfig.min}`);
    this.stepInput.setAttribute('min', '0');
  }

  setOrientation(orientation: string) {
    rangeSlider.setOrientation(orientation);
  }

  addListeners() {
    document.addEventListener('mousemove', () => {
      this.minInput.value = rangeSlider.getValues()[0];
      this.maxInput.value = rangeSlider.getValues()[1];
    });
    slider.addEventListener('click', () => {
      this.minInput.value = rangeSlider.getValues()[0];
      this.maxInput.value = rangeSlider.getValues()[1];
    });
    this.minInput?.addEventListener('input', () => {
      rangeSlider.setValues([+this.minInput.value, undefined]);
    });
    this.maxInput?.addEventListener('input', () => {
      rangeSlider.setValues([undefined, +this.maxInput.value]);
    });
    this.stepInput?.addEventListener('input', () => {
      this.step = Number(this.stepInput.value);
      this.minInput.setAttribute('step', `${this.step}`);
      this.maxInput.setAttribute('step', `${this.step}`);
      rangeSlider.setStep(Number(this.stepInput.value));
    });
    this.orientation?.addEventListener('click', () => {
      if (this.orientation.checked) {
        this.setOrientation('vertical');
      } else {
        this.setOrientation('horizontal');
      }
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
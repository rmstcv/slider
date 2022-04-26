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

  minInput: HTMLInputElement;

  maxInput: HTMLInputElement;

  stepInput: HTMLInputElement;

  sliderInitConfig: Init;

  step: number;

  orientation: HTMLInputElement;

  min: number;

  max: number;

  constructor() {
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', config);
    this.sliderInitConfig = sliderInitConfig;
    this.step = this.sliderInitConfig.step;
    this.min = this.sliderInitConfig.setMin;
    this.max = this.sliderInitConfig.setMax;
  }

  setMin() {
    this.minInput.setAttribute('min', `${this.sliderInitConfig.min}`);
    this.minInput.setAttribute('max', `${this.max}`);
    this.minInput.value = `${this.sliderInitConfig.setMin}`;
  }

  setMax() {
    this.maxInput.setAttribute('min', `${this.min}`);
    this.maxInput.setAttribute('max', `${this.sliderInitConfig.max}`);
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

    const setValues = () => {
      this.minInput.value = rangeSlider.getValues()[0];
      this.maxInput.value = rangeSlider.getValues()[1];
      this.min = +this.minInput.value;
      this.max = +this.maxInput.value;
      this.maxInput.setAttribute('min', this.minInput.value);
      this.minInput.setAttribute('max', this.maxInput.value);
    };

    document.addEventListener('mouseup', () => {      
      document.removeEventListener('mousemove', setValues);
    });
    
    document.addEventListener('mousedown', (e) => {
      if (e.target === searchElem('.slider__handle-lower', slider) || 
      e.target === searchElem('.slider__handle-upper', slider)) {
        document.addEventListener('mousemove', setValues);
      }
    });

    config.addEventListener('click', (e) => {
      const elem = e.target as HTMLElement;
      const elemPar = elem.parentNode as HTMLElement;
      const elemInput = searchElem('input', elemPar) as HTMLInputElement;
      
      if (elemPar.classList.contains('config__input-min')) {
        if (elem.classList.contains('config__inc') && this.min < this.max) {
          this.min += this.step;
        }
        if (elem.classList.contains('config__dec') && this.min > this.sliderInitConfig.min) {
          this.min -= this.step;
        }
        rangeSlider.setValues([this.min, undefined]);
        this.min = rangeSlider.getValues()[0];
        elemInput.value = `${this.min}`;
        this.maxInput.setAttribute('min', `${this.min}`);
        
      }
      if (elemPar.classList.contains('config__input-max')) {
        if (elem.classList.contains('config__inc') && this.max < this.sliderInitConfig.max) {
          this.max += this.step;
        }
        if (elem.classList.contains('config__dec') && this.max > this.min) {
          this.max -= this.step;
        }
        rangeSlider.setValues([undefined, this.max]);
        this.max = rangeSlider.getValues()[1];
        elemInput.value = `${this.max}`;
        this.minInput.setAttribute('max', `${this.max}`);
      }
    });
    const scale = searchElem('.slider__scale-value', slider)!;
    scale.addEventListener('click', (e) => {
      const elem: HTMLElement = e.target as HTMLElement;
      const value: number = Number(elem.getAttribute('data-value'));
      if (elem.classList.contains('slider__scale-marker-value')) {
        this.minInput.value = `${this.sliderInitConfig.min}`;
        this.maxInput.value = `${value}`;
        this.min = this.sliderInitConfig.min;
        this.max = value;
        this.maxInput.setAttribute('min', `${this.sliderInitConfig.min}`);
        this.minInput.setAttribute('max', `${value}`);
      }
    });
    this.minInput?.addEventListener('input', () => {
      this.min = +this.minInput.value;
      this.minInput.setAttribute('max', this.maxInput.value);
      rangeSlider.setValues([+this.minInput.value, undefined]);
    });
    this.maxInput?.addEventListener('input', () => {
      this.max = +this.maxInput.value;
      this.maxInput.setAttribute('min', this.minInput.value);
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

const configPanel = new ConfigPanel();
configPanel.init();
import sliderCreate from './jquery.slider-plugin';
import searchElem from './searchElem';

const sliderInitConfig: Init = {
  min: -0.0030,
  max: 0.0030,
  step: 0.0005,
  setMin: -0.0010,
  setMax: 0.0010,
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

  type: HTMLInputElement;

  toolTip: HTMLInputElement;

  min: number;

  max: number;

  constructor() {
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', config);
    this.type = <HTMLInputElement> searchElem('.config-input_type', config);
    this.toolTip = <HTMLInputElement> searchElem('.config-input_tool-tip', config);
    this.sliderInitConfig = sliderInitConfig;
    this.step = this.sliderInitConfig.step;
    this.min = this.sliderInitConfig.setMin;
    this.max = this.sliderInitConfig.setMax;
  }

  initValues() {
    this.minInput.value = `${this.sliderInitConfig.setMin}`;
    this.minInput.setAttribute('max', `${this.sliderInitConfig.max}`);
    this.minInput.setAttribute('min', `${this.sliderInitConfig.min}`);
    this.maxInput.value = `${this.sliderInitConfig.setMax}`;
    this.maxInput.setAttribute('max', `${this.sliderInitConfig.max}`);
    this.maxInput.setAttribute('min', `${this.sliderInitConfig.min}`);
  }

  setMin() {
    rangeSlider.setValues([this.min, undefined]);
    this.min = rangeSlider.getValues()[0];
    this.minInput.value = `${this.min}`;  
  }

  setMax() {
    rangeSlider.setValues([undefined, this.max]);
    this.max = rangeSlider.getValues()[1];
    this.maxInput.value = `${this.max}`;
  }

  setStepInit() {
    this.stepInput.value = `${this.step}`;
    this.stepInput.setAttribute('max', `${this.sliderInitConfig.max - this.sliderInitConfig.min}`);
    this.stepInput.setAttribute('min', '0');
  }

  setStep() { 
    this.step = rangeSlider.setStep(this.step);
    this.stepInput.value = `${this.step}`; 
  }

  setOrientation(orientation: string) {
    rangeSlider.setOrientation(orientation);
  }

  changeValues(e: Event) {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    
    if (elemPar.classList.contains('config__input-min') && this.sliderInitConfig.sliderType !== 'single') {
      if (elem.classList.contains('config__inc') && this.min < this.max) {
        this.min += this.step;
      }
      if (elem.classList.contains('config__dec') && this.min > this.sliderInitConfig.min) {
        this.min -= this.step;
      }
      this.setMin();
      
    }
    if (elemPar.classList.contains('config__input-max')) {
      if (elem.classList.contains('config__inc') && this.max < this.sliderInitConfig.max) {
        this.max += this.step;
      }
      if (elem.classList.contains('config__dec') && this.max > this.min) {
        this.max -= this.step;
      }
      this.setMax();
    }
  }

  setValues() {
    this.minInput.value = rangeSlider.getValues()[0];
    this.maxInput.value = rangeSlider.getValues()[1];
    this.min = +this.minInput.value;
    this.max = +this.maxInput.value;
  }

  changeValuesFromScale(e: Event) {
    const elem: HTMLElement = e.target as HTMLElement;
    const value: number = Number(elem.getAttribute('data-value'));
    if (elem.classList.contains('slider__scale-marker-value')) {
      this.minInput.value = `${this.sliderInitConfig.min}`;
      this.maxInput.value = `${value}`;
      this.min = this.sliderInitConfig.min;
      this.max = value;
    }
  }

  changeStep(e: Event) {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    const inc = (this.sliderInitConfig.max - this.sliderInitConfig.min) / 100;
    
    if (elemPar.classList.contains('config__input-step')) {
      if (elem.classList.contains('config__inc')) {
        this.step = parseFloat((this.step + inc).toFixed(this.sliderInitConfig.max.toString().length));
      }
      if (elem.classList.contains('config__dec')) {
        this.step = parseFloat((this.step - inc).toFixed(this.sliderInitConfig.max.toString().length));
      }
    }
    this.setStep();
  }

  setType(type: 'range' | 'single') {
    this.sliderInitConfig.sliderType = type;
    this.minInput.value = `${this.min}`;
    rangeSlider.setType(type);
  }

  setToolTip() {
    rangeSlider.setToolTip();
  }

  addListeners() {
    const setValuesBind = this.setValues.bind(this);
    const scale = searchElem('.slider__scale-value', slider)!;

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', setValuesBind);
    });
    
    document.addEventListener('mousedown', (e) => {
      if (e.target === searchElem('.slider__handle-lower', slider) || 
      e.target === searchElem('.slider__handle-upper', slider)) {
        document.addEventListener('mousemove', setValuesBind);
      }
    });

    config.addEventListener('click', (e) => this.changeValues(e));

    scale.addEventListener('click', (e) => this.changeValuesFromScale(e));

    config.addEventListener('click', (e) => this.changeStep(e));

    this.minInput?.addEventListener('change', () => {
      if (this.sliderInitConfig.sliderType !== 'single') {
        this.min = +this.minInput.value;
        this.setMin();
      } else {
        this.minInput.value = `${this.min}`;
      }
    });

    this.maxInput?.addEventListener('change', () => {
      this.max = +this.maxInput.value;
      this.setMax();
    });

    this.stepInput?.addEventListener('change', () => {
      this.step = +this.stepInput.value;
      this.setStep();
    });

    this.orientation?.addEventListener('click', () => {
      if (this.orientation.checked) {
        this.setOrientation('vertical');
      } else {
        this.setOrientation('horizontal');
      }
    });

    this.type?.addEventListener('click', () => {
      if (this.sliderInitConfig.sliderType === 'single') {
        this.setType('range');
      } else {
        this.min = this.sliderInitConfig.min;
        this.setType('single');
      }
    });

    this.toolTip?.addEventListener('click', () => {
      if (this.sliderInitConfig.toolTip) {
        this.sliderInitConfig.toolTip = false;
      } else {
        this.sliderInitConfig.toolTip = true;
      }
      this.setToolTip();
    });
  }

  init() {
    this.initValues();
    this.setStepInit();
    this.addListeners();
  }
}

const configPanel = new ConfigPanel();
configPanel.init();
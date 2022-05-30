import sliderCreate from './jquery.slider-plugin';
import searchElem from './searchElem';
import sliderInitConfig from './sliderInitConfig';

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

  scale: HTMLInputElement;

  min: number;

  max: number;

  constructor() {
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', config);
    this.type = <HTMLInputElement> searchElem('.config-input_type', config);
    this.toolTip = <HTMLInputElement> searchElem('.config-input_tool-tip', config);
    this.scale = <HTMLInputElement> searchElem('.config-input_scale', config);
    this.sliderInitConfig = { ...sliderInitConfig };
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

  setMin(setMin: number) {
    rangeSlider.setSlider('valueFrom', setMin);
    const newMin = rangeSlider.getState().setMin;
    this.minInput.value = `${newMin}`;  
  }

  setMax(setMax: number) {
    rangeSlider.setSlider('valueTo', setMax);
    const newMax = rangeSlider.getState().setMax;
    this.maxInput.value = `${newMax}`;
  }

  setStepInit() {
    this.stepInput.value = `${this.step}`;
    this.stepInput.setAttribute('max', `${this.sliderInitConfig.max - this.sliderInitConfig.min}`);
    this.stepInput.setAttribute('min', `${this.step}`);
  }

  setStep(step: number) { 
    rangeSlider.setSlider('step', step);
    const newStep = rangeSlider.getState().step;
    this.stepInput.value = `${newStep}`; 
  }

  setOrientation(orientation: string) {
    rangeSlider.setOrientation(orientation);
  }

  changeValues(e: Event) {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { setMin, setMax, step, sliderType } =  rangeSlider.getState();
    
    if (elemPar.classList.contains('config__input-min') && sliderType !== 'single') {
      if (elem.classList.contains('config__inc')) setMin += step;
      if (elem.classList.contains('config__dec')) setMin -= step;
      this.setMin(setMin);
    }

    if (elemPar.classList.contains('config__input-max')) {
      if (elem.classList.contains('config__inc')) setMax += step;
      if (elem.classList.contains('config__dec')) setMax -= step;
      this.setMax(setMax);
    }
  }

  setValues() {
    let { setMin, setMax } =  rangeSlider.getState();
    this.minInput.value = setMin;
    this.maxInput.value = setMax;
  }

  changeValuesFromScale(target: HTMLElement) {    
    if (target.classList.contains('slider__scale-marker-value')) {
      let { min, setMax } =  rangeSlider.getState();
      this.minInput.value = `${min}`;
      this.maxInput.value = `${setMax}`;
    }
  }

  changeStep(e: Event) {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { min, max, step } =  rangeSlider.getState();    
    const inc = (max - min) / 100;
    
    if (elemPar.classList.contains('config__input-step')) {
      if (elem.classList.contains('config__inc')) this.setStep(parseFloat(((step + inc)).toFixed(min.toString().length)));
      if (elem.classList.contains('config__dec')) this.setStep(parseFloat(((step - inc)).toFixed(min.toString().length)));
    }
  }

  setType(type: 'range' | 'single') {
    let { min } =  rangeSlider.getState();
    rangeSlider.setSlider('type', type);
    this.minInput.value = `${min}`;
  }

  setToolTip() {
    rangeSlider.setToolTip();
  }

  setScale() {
    rangeSlider.setScale();
  }

  addListeners() {
    const setValuesBind = this.setValues.bind(this);
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

    slider.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      this.changeValuesFromScale(target);
    });

    config.addEventListener('click', (e) => this.changeStep(e));

    this.minInput?.addEventListener('change', () => {
      const { sliderType } =  rangeSlider.getState();
      if (sliderType !== 'single') {
        this.min = +this.minInput.value;
        this.setMin(this.min);
      } else {
        this.minInput.value = `${this.min}`;
      }
    });

    this.maxInput?.addEventListener('change', () => {
      this.max = +this.maxInput.value;
      this.setMax(this.max);
    });

    this.stepInput?.addEventListener('change', () => {
      // this.step = +this.stepInput.value;
      this.setStep(+this.stepInput.value);
    });

    this.orientation?.addEventListener('click', () => {
      if (this.orientation.checked) {
        this.setOrientation('vertical');
      } else {
        this.setOrientation('horizontal');
      }
    });

    this.type.addEventListener('click', () => {
      const { sliderType } =  rangeSlider.getState();
      if (sliderType === 'single') {
        this.setType('range');
      } else {
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

    this.scale?.addEventListener('click', () => {
      this.setScale();
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
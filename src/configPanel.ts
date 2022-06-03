import sliderCreate from './jquery.slider-plugin';
import searchElem from './searchElem';
import sliderInitConfig from './sliderInitConfig';

const slider = document.querySelector('.slider') as HTMLElement;
const config = document.querySelector('.config') as HTMLElement;
const rangeSlider = sliderCreate(slider, sliderInitConfig);

class ConfigPanel {
  readonly sliderInitConfig: Init;

  private minInput!: HTMLInputElement;

  private maxInput!: HTMLInputElement;

  private stepInput!: HTMLInputElement;

  private orientation!: HTMLInputElement;

  private type!: HTMLInputElement;

  private toolTip!: HTMLInputElement;

  private scale!: HTMLInputElement;

  constructor() {
    this.sliderInitConfig = { ...sliderInitConfig };
  }

  public init() {
    this.initElems();
    this.initValues();
    this.addListeners();
  }

  private initElems() {
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', config);
    this.type = <HTMLInputElement> searchElem('.config-input_type', config);
    this.toolTip = <HTMLInputElement> searchElem('.config-input_tool-tip', config);
    this.scale = <HTMLInputElement> searchElem('.config-input_scale', config);
  }

  private initValues() {
    this.minInput.value = `${this.sliderInitConfig.valueFrom}`;
    this.minInput.setAttribute('max', `${this.sliderInitConfig.max}`);
    this.minInput.setAttribute('min', `${this.sliderInitConfig.min}`);
    this.maxInput.value = `${this.sliderInitConfig.valueTo}`;
    this.maxInput.setAttribute('max', `${this.sliderInitConfig.max}`);
    this.maxInput.setAttribute('min', `${this.sliderInitConfig.min}`);
    this.stepInput.value = `${this.sliderInitConfig.step}`;
    this.stepInput.setAttribute('max', `${this.sliderInitConfig.max - this.sliderInitConfig.min}`);
    this.stepInput.setAttribute('min', `${this.sliderInitConfig.step}`);
  }

  private valueFrom(valueFrom: number) {
    rangeSlider.setSlider('valueFrom', valueFrom);
    const newMin = rangeSlider.getState().valueFrom;
    this.minInput.value = `${newMin}`;  
  }

  private valueTo(valueTo: number) {
    rangeSlider.setSlider('valueTo', valueTo);
    const newMax = rangeSlider.getState().valueTo;
    this.maxInput.value = `${newMax}`;
  }

  private setStep(step: number) { 
    rangeSlider.setSlider('step', step);
    const newStep = rangeSlider.getState().step;
    this.stepInput.value = `${newStep}`; 
  }

  private setOrientation() {
    if (this.orientation.checked) {
      rangeSlider.setSlider('orientation', 'horizontal');
    } else {
      rangeSlider.setSlider('orientation', 'vertical');
    }
  }

  private changeValues(e: Event) {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { valueFrom, valueTo, step, type } =  rangeSlider.getState();
    
    if (elemPar.classList.contains('config__input-min') && type !== 'single') {
      if (elem.classList.contains('config__inc')) valueFrom += step;
      if (elem.classList.contains('config__dec')) valueFrom -= step;
      this.valueFrom(valueFrom);
    }

    if (elemPar.classList.contains('config__input-max')) {
      if (elem.classList.contains('config__inc')) valueTo += step;
      if (elem.classList.contains('config__dec')) valueTo -= step;
      this.valueTo(valueTo);
    }
  }

  private setValues() {
    let { valueFrom, valueTo } =  rangeSlider.getState();
    this.minInput.value = valueFrom.toString();
    this.maxInput.value = valueTo.toString();
  }

  private changeValuesFromScale(target: HTMLElement) {    
    if (target.classList.contains('slider__scale-marker-value')) {
      let { min, valueTo } =  rangeSlider.getState();
      this.minInput.value = min.toString();
      this.maxInput.value = valueTo.toString();
    }
  }

  private changeStep(e: Event) {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { min, max, step } =  rangeSlider.getState();    
    const inc = (max - min) / 100;
    
    if (elemPar.classList.contains('config__input-step')) {
      if (elem.classList.contains('config__inc')) this.setStep(parseFloat(((step + inc)).toFixed(min.toString().length)));
      if (elem.classList.contains('config__dec')) this.setStep(parseFloat(((step - inc)).toFixed(min.toString().length)));
    }
  }

  private setType() {
    const { min } =  rangeSlider.getState();

    if (this.type.checked) {
      rangeSlider.setSlider('type', 'single');
    } else {
      rangeSlider.setSlider('type', 'range');
    }
    this.minInput.value = `${min}`;
  }

  private setToolTip() {
    if (this.toolTip.checked) {
      rangeSlider.setSlider('toolTip', false);
    } else {
      rangeSlider.setSlider('toolTip', true);
    }
  }

  private setScale() {
    if (this.scale.checked) {
      rangeSlider.setSlider('scale', false);
    } else {
      rangeSlider.setSlider('scale', true);
    }
  }

  private addListeners() {
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

    this.minInput.addEventListener('change', () => {
      const { type } =  rangeSlider.getState();
      if (type !== 'single') this.valueFrom(+this.minInput.value);
    });

    this.maxInput.addEventListener('change', () => this.valueTo(+this.maxInput.value));
    this.stepInput.addEventListener('change', () => this.setStep(+this.stepInput.value));
    this.orientation.addEventListener('click', () => this.setOrientation());
    this.type.addEventListener('click', () => this.setType());
    this.toolTip.addEventListener('click', () => this.setToolTip());
    this.scale.addEventListener('click', () => this.setScale());
  }
}

const configPanel = new ConfigPanel();
configPanel.init();
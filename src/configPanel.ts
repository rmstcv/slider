import sliderCreate from './jquery.slider-plugin';
import searchElem from './searchElem';
import sliderInitConfig from './sliderInitConfig';

const slider = document.querySelector('.slider') as HTMLElement;
const config = document.querySelector('.config') as HTMLElement;
const rangeSlider = sliderCreate(slider, sliderInitConfig);

class ConfigPanel {
  readonly sliderInitConfig: Init;

  private valueFromInput!: HTMLInputElement;

  private valueToInput!: HTMLInputElement;

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

  public init(): void {
    this.initElems();
    this.initValues();
    this.addListeners();
  }

  private initElems(): void {
    this.valueFromInput = <HTMLInputElement> searchElem('.config-input_value-from', config);
    this.valueToInput = <HTMLInputElement> searchElem('.config-input_value-to', config);
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', config);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', config);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', config);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', config);
    this.type = <HTMLInputElement> searchElem('.config-input_type', config);
    this.toolTip = <HTMLInputElement> searchElem('.config-input_tool-tip', config);
    this.scale = <HTMLInputElement> searchElem('.config-input_scale', config);
  }

  private addAttributes(): void {
    let { min, max, step } =  rangeSlider.getState();
    const inputs =  [
      this.valueFromInput,
      this.valueToInput,
      this.minInput,
      this.maxInput,
    ];
    inputs.forEach((input) => {
      input.setAttribute('max', `${max}`);
      input.setAttribute('min', `${min}`);
    });
    this.stepInput.setAttribute('max', `${max - min}`);
    this.stepInput.setAttribute('min', `${step}`);
  }

  private initValues(): void {
    const { min, max, valueFrom, valueTo, step } =  rangeSlider.getState();
    this.valueFromInput.value = `${valueFrom}`;
    this.valueToInput.value = `${valueTo}`;
    this.minInput.value = `${min}`;
    this.maxInput.value = `${max}`;
    this.stepInput.value = `${step}`;
    this.addAttributes();
    this.isBtnActive();
  }

  private isBtnActive(): void {
    let { orientation, type, scale, toolTip } =  rangeSlider.getState();

    if (orientation === 'horizontal') {
      this.orientation.checked = true;
    } else {
      this.orientation.checked = false;
    }

    if (toolTip === true) {
      this.toolTip.checked = true;
    } else {
      this.toolTip.checked = false;
    }

    if (type === 'range') {
      this.type.checked = true;
    } else {
      this.type.checked = false;
    }
    
    if (scale === true) {
      this.scale.checked = true;
    } else {
      this.scale.checked = false;
    }
  }

  private setValue(valueName: Actions, value: Params): void {
    rangeSlider.setSlider(valueName, value);
    const newValue = rangeSlider.getState()[valueName];
    
    switch (valueName) {
      case 'valueFrom': this.valueFromInput.value = `${newValue}`;
        break;
      case 'valueTo': this.valueToInput.value = `${newValue}`;
        break;
      case 'min': this.minInput.value = `${newValue}`;
        break;
      case 'max': this.maxInput.value = `${newValue}`;
        break;
      case 'step': this.stepInput.value = `${newValue}`;
        break;
    }
  }

  private setOrientation(): void {
    if (this.orientation.checked) {
      rangeSlider.setSlider('orientation', 'horizontal');
    } else {
      rangeSlider.setSlider('orientation', 'vertical');
    }
  }

  private changeValues(e: Event): void {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { min, max, valueFrom, valueTo, step, type } =  rangeSlider.getState();
    const checkIncOrDec = (value: number) => {
      let newValue = value;

      if (elem.classList.contains('config__inc')) newValue += step;

      if (elem.classList.contains('config__dec')) newValue -= step;
      return newValue;
    };
    
    if (elemPar.classList.contains('config__input-value-from') && type !== 'single') {
      this.setValue('valueFrom', checkIncOrDec(valueFrom));
    }

    if (elemPar.classList.contains('config__input-value-to')) {
      this.setValue('valueTo', checkIncOrDec(valueTo));
    }

    if (elemPar.classList.contains('config__input-min')) {   
      this.setValue('min', checkIncOrDec(min));
      if (type === 'single') {
        ({ min } = rangeSlider.getState());
        this.valueFromInput.value = `${min}`;
      }
    }

    if (elemPar.classList.contains('config__input-max')) {
      this.setValue('max', checkIncOrDec(max));
    }
  }

  private setValues(): void {
    let { valueFrom, valueTo } =  rangeSlider.getState();
    this.valueFromInput.value = valueFrom.toString();
    this.valueToInput.value = valueTo.toString();
  }

  private changeValuesFromScale(target: HTMLElement): void {    
    if (target.classList.contains('slider__scale-marker-value')) {
      let { min, valueTo } =  rangeSlider.getState();
      this.valueFromInput.value = min.toString();
      this.valueToInput.value = valueTo.toString();
    }
  }

  private changeStep(e: Event): void {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { min, max, step } =  rangeSlider.getState();    
    const inc = (max - min) / 100;
    
    if (elemPar.classList.contains('config__input-step')) {

      if (elem.classList.contains('config__inc')) this.setValue('step', parseFloat(((step + inc)).toFixed(min.toString().length)));

      if (elem.classList.contains('config__dec')) this.setValue('step', parseFloat(((step - inc)).toFixed(min.toString().length)));
    }
  }

  private setType(): void {
    const { min } =  rangeSlider.getState();

    if (this.type.checked) {
      rangeSlider.setSlider('type', 'range');
    } else {
      rangeSlider.setSlider('type', 'single');
      this.valueFromInput.value = `${min}`;
    }
  }

  private setToolTip(): void {
    if (this.toolTip.checked) {
      rangeSlider.setSlider('toolTip', true);
    } else {
      rangeSlider.setSlider('toolTip', false);
    }
  }

  private setScale(): void {
    if (this.scale.checked) {
      rangeSlider.setSlider('scale', true);
    } else {
      rangeSlider.setSlider('scale', false);
    }
  }

  private checkIsRange(): boolean {
    const { type } =  rangeSlider.getState();

    if (type === 'single') {
      return false;
    } else {
      return true;
    }
  }

  private addListeners(): void {
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
    slider.addEventListener('click', (e) => this.changeValuesFromScale(e.target as HTMLElement));
    config.addEventListener('click', (e) => this.changeStep(e));

    this.valueFromInput.addEventListener('change', () => {
      if (this.checkIsRange()) {
        this.setValue('valueFrom', +this.valueFromInput.value);
      } else {
        this.valueFromInput.value = rangeSlider.getState().min.toString();
      }
    });

    this.valueToInput.addEventListener('change', () => this.setValue('valueTo', +this.valueToInput.value));
    this.minInput.addEventListener('change', () => this.setValue('min', +this.minInput.value));
    this.maxInput.addEventListener('change', () => this.setValue('max', +this.maxInput.value));
    this.stepInput.addEventListener('change', () => this.setValue('step', +this.stepInput.value));
    this.orientation.addEventListener('click', () => this.setOrientation());
    this.type.addEventListener('click', () => this.setType());
    this.toolTip.addEventListener('click', () => this.setToolTip());
    this.scale.addEventListener('click', () => this.setScale());
  }
}

const configPanel = new ConfigPanel();
configPanel.init();
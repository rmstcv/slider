import searchElem from './searchElem';

class ConfigPanel {
  private valueFromInput!: HTMLInputElement;

  private valueToInput!: HTMLInputElement;

  private minInput!: HTMLInputElement;

  private maxInput!: HTMLInputElement;

  private stepInput!: HTMLInputElement;

  private orientation!: HTMLInputElement;

  private type!: HTMLInputElement;

  private toolTip!: HTMLInputElement;

  private scale!: HTMLInputElement;

  private rangeSlider: JQuery<HTMLElement>;

  private configPaneElement: HTMLElement;

  private sliderElement: HTMLElement;

  constructor(rangeSlider: JQuery<HTMLElement>, configPaneElement: HTMLElement, sliderElement: HTMLElement) {
    this.rangeSlider = rangeSlider;
    this.configPaneElement = configPaneElement;
    this.sliderElement = sliderElement;
    this.init();
  }

  public init(): void {
    this.initElems();
    this.initValues();
    this.addListeners();
  }

  private initElems(): void {
    this.valueFromInput = <HTMLInputElement> searchElem('.config-input_value-from', this.configPaneElement);
    this.valueToInput = <HTMLInputElement> searchElem('.config-input_value-to', this.configPaneElement);
    this.minInput = <HTMLInputElement> searchElem('.config-input_min', this.configPaneElement);
    this.maxInput = <HTMLInputElement> searchElem('.config-input_max', this.configPaneElement);
    this.stepInput = <HTMLInputElement> searchElem('.config-input_step', this.configPaneElement);
    this.orientation = <HTMLInputElement> searchElem('.config-input_orientation', this.configPaneElement);
    this.type = <HTMLInputElement> searchElem('.config-input_type', this.configPaneElement);
    this.toolTip = <HTMLInputElement> searchElem('.config-input_tool-tip', this.configPaneElement);
    this.scale = <HTMLInputElement> searchElem('.config-input_scale', this.configPaneElement);
  }

  private addAttributes(): void {
    let { min, max, step } =  this.rangeSlider.getState();
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
    const { min, max, valueFrom, valueTo, step } =  this.rangeSlider.getState();
    this.valueFromInput.value = `${valueFrom}`;
    this.valueToInput.value = `${valueTo}`;
    this.minInput.value = `${min}`;
    this.maxInput.value = `${max}`;
    this.stepInput.value = `${step}`;
    this.addAttributes();
    this.isBtnActive();
  }

  private isBtnActive(): void {
    let { orientation, type, scale, toolTip } =  this.rangeSlider.getState();

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
    this.rangeSlider.setSlider(valueName, value);
    const newValue = this.rangeSlider.getState()[valueName];
    
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
      this.rangeSlider.setSlider('orientation', 'horizontal');
    } else {
      this.rangeSlider.setSlider('orientation', 'vertical');
    }
  }

  private changeValues(e: Event): void {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { min, max, valueFrom, valueTo, step, type } =  this.rangeSlider.getState();
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
        ({ min } = this.rangeSlider.getState());
        this.valueFromInput.value = `${min}`;
      }
    }

    if (elemPar.classList.contains('config__input-max')) {
      this.setValue('max', checkIncOrDec(max));
    }
  }

  private setValues(): void {
    let { valueFrom, valueTo } =  this.rangeSlider.getState();
    this.valueFromInput.value = valueFrom.toString();
    this.valueToInput.value = valueTo.toString();
  }

  private changeValuesFromScale(target: HTMLElement): void {    
    if (target.classList.contains('slider__scale-marker-value')) {
      let { min, valueTo } =  this.rangeSlider.getState();
      this.valueFromInput.value = min.toString();
      this.valueToInput.value = valueTo.toString();
    }
  }

  private changeStep(e: Event): void {
    const elem = e.target as HTMLElement;
    const elemPar = elem.parentNode as HTMLElement;
    let { min, max, step } =  this.rangeSlider.getState();    
    const inc = (max - min) / 100;
    
    if (elemPar.classList.contains('config__input-step')) {

      if (elem.classList.contains('config__inc')) this.setValue('step', (step + inc));

      if (elem.classList.contains('config__dec')) this.setValue('step', (step - inc));
    }
  }

  private setType(): void {
    const { min } =  this.rangeSlider.getState();

    if (this.type.checked) {
      this.rangeSlider.setSlider('type', 'range');
    } else {
      this.rangeSlider.setSlider('type', 'single');
      this.valueFromInput.value = `${min}`;
    }
  }

  private setToolTip(): void {
    if (this.toolTip.checked) {
      this.rangeSlider.setSlider('toolTip', true);
    } else {
      this.rangeSlider.setSlider('toolTip', false);
    }
  }

  private setScale(): void {
    if (this.scale.checked) {
      this.rangeSlider.setSlider('scale', true);
    } else {
      this.rangeSlider.setSlider('scale', false);
    }
  }

  private checkIsRange(): boolean {
    const { type } =  this.rangeSlider.getState();

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
      if (e.target === searchElem('.slider__handle-lower', this.sliderElement) || 
      e.target === searchElem('.slider__handle-upper', this.sliderElement)) {
        document.addEventListener('mousemove', setValuesBind);
      }
    });

    this.configPaneElement.addEventListener('click', (e) => this.changeValues(e));
    this.sliderElement.addEventListener('click', (e) => this.changeValuesFromScale(e.target as HTMLElement));
    this.configPaneElement.addEventListener('click', (e) => this.changeStep(e));

    this.valueFromInput.addEventListener('change', () => {
      if (this.checkIsRange()) {
        this.setValue('valueFrom', +this.valueFromInput.value);
      } else {
        this.valueFromInput.value = this.rangeSlider.getState().min.toString();
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

export default ConfigPanel;
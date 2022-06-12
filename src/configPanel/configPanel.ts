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

  private configPaneElement!: HTMLElement;

  private rootElement: HTMLElement;

  constructor(rangeSlider: JQuery<HTMLElement>, rootElement: HTMLElement) {
    this.rangeSlider = rangeSlider;
    this.rootElement = rootElement;
    this.init();
  }

  public init(): void {
    this.createConfigPanel();
    this.createInputsElems();
    this.createBtnElems();
    this.initElems();
    this.initValues();
    this.addListeners();
  }

  private createConfigPanel(): void {
    const configPanel = document.createElement('div');
    configPanel.classList.add('config');
    this.configPaneElement = configPanel;
    this.rootElement.appendChild(this.configPaneElement);
  }

  private getElemsClass() {
    const elemsClass = {
      valueFrom: 'value-from',
      valueTo: 'value-to',
      min: 'min',
      max: 'max',
      step: 'step',
      orientation: 'orientation',
      type: 'type',
      toolTip: 'tool-tip',
      scale: 'scale',
    };
    return elemsClass;
  }

  private initElems() {
    const elems = this.configPaneElement.getElementsByTagName('input');
    const classes = this.getElemsClass();

    for (let elem of elems) {
      
      if (elem.matches(`.config-input_${classes.valueFrom}`)) {
        this.valueFromInput = elem;
      }

      if (elem.matches(`.config-input_${classes.valueTo}`)) {
        this.valueToInput = elem;
      }

      if (elem.matches(`.config-input_${classes.min}`)) {
        this.minInput = elem;
      }

      if (elem.matches(`.config-input_${classes.max}`)) {
        this.maxInput = elem;
      }

      if (elem.matches(`.config-input_${classes.step}`)) {
        this.stepInput = elem;
      }

      if (elem.matches(`.config-input_${classes.orientation}`)) {
        this.orientation = elem;
      }

      if (elem.matches(`.config-input_${classes.type}`)) {
        this.type = elem;
      }

      if (elem.matches(`.config-input_${classes.toolTip}`)) {
        this.toolTip = elem;
      }

      if (elem.matches(`.config-input_${classes.scale}`)) {
        this.scale = elem;
      }
    }
  }

  private createInputsElems(): void {
    const configInputGroup = document.createElement('div');
    configInputGroup.classList.add('config-group');
    const { valueFrom, valueTo, min, max, step } = this.getElemsClass();
    const valueElems = [
      { name: 'value from', class: valueFrom },
      { name: 'value to', class: valueTo },
      { name: 'min', class: min },
      { name: 'max', class: max },
      { name: 'step', class: step },
    ];

    for (let i = 0; i < valueElems.length; i += 1) {
      let inputElem = document.createElement('div');
      inputElem.classList.add('config__input');
      inputElem.innerHTML = `
        <div class="config__input-name">
          ${valueElems[i].name}:
        </div>
        <div class="config__input-${valueElems[i].class}">
          <div class="config__dec"></div>
          <label>
            <input type="number" class="config-input config-input_${valueElems[i].class}">
          </label>
          <div class="config__inc"></div>
        </div>
      `;
      configInputGroup.appendChild(inputElem);
    } 
    this.configPaneElement.appendChild(configInputGroup);
  }

  private createBtnElems(): void {
    const configBtnGroup = document.createElement('div');
    configBtnGroup.classList.add('config-group');
    const { orientation, type, toolTip, scale } = this.getElemsClass();
    const btnElems = [
      { name: 'horizontal', class: orientation },
      { name: 'range', class: type },
      { name: 'tool', class: toolTip },
      { name: 'scale', class: scale },
    ];
    
    for (let i = 0; i < btnElems.length; i += 1) {
      let btnElem = document.createElement('div');
      btnElem.classList.add('config__input', 'config__input_btn');
      btnElem.innerHTML = `
        <div class="config__input-name">
          ${btnElems[i].name}
        </div>
        <label class="config-input config-input__${btnElems[i].class}">
          <input type="checkbox" class="config-input config-input_${btnElems[i].class}">
          <div class="config-input__button"></div>
        </label>
      `;
      configBtnGroup.appendChild(btnElem);
    }
    this.configPaneElement.appendChild(configBtnGroup);
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

  private addListeners(): void {
    const setValuesBind = this.setValues.bind(this);
    this.rangeSlider.sliderOnChange(() => setValuesBind());
    this.configPaneElement.addEventListener('click', (e) => this.changeValues(e));
    this.configPaneElement.addEventListener('click', (e) => this.changeStep(e));
    this.valueFromInput.addEventListener('change', () => this.setValue('valueFrom', +this.valueFromInput.value));
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
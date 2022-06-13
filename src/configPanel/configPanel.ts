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
    configPanel.classList.add('config', 'js-config');
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
      
      if (elem.matches(`.js-config-${classes.valueFrom}`)) {
        this.valueFromInput = elem;
      }

      if (elem.matches(`.js-config-${classes.valueTo}`)) {
        this.valueToInput = elem;
      }

      if (elem.matches(`.js-config-${classes.min}`)) {
        this.minInput = elem;
      }

      if (elem.matches(`.js-config-${classes.max}`)) {
        this.maxInput = elem;
      }

      if (elem.matches(`.js-config-${classes.step}`)) {
        this.stepInput = elem;
      }

      if (elem.matches(`.js-config-${classes.orientation}`)) {
        this.orientation = elem;
      }

      if (elem.matches(`.js-config-${classes.type}`)) {
        this.type = elem;
      }

      if (elem.matches(`.js-config-${classes.toolTip}`)) {
        this.toolTip = elem;
      }

      if (elem.matches(`.js-config-${classes.scale}`)) {
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
        <div class="config_inputs">
          <div class="config__dec"></div>
            <input type="number" class="config-input js-config-${valueElems[i].class}">
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
        <label class="config-input__button">
          <input type="checkbox" class="js-config-${btnElems[i].class}">
          <div class="config-input__button-on"></div>
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

  private changeValues(e: Event): void {
    const elem = e.target as HTMLElement;
    let { min, max, valueFrom, valueTo, step, type } =  this.rangeSlider.getState();

    if (elem.classList.contains('config__inc') || elem.classList.contains('config__dec')) {
      const inputElem = elem.parentNode!.querySelector('input') as HTMLElement;
      let inc = elem.classList.contains('config__inc') ? step : -step;

      if (inputElem === this.valueFromInput && type !== 'single') {
        this.setValue('valueFrom', valueFrom + inc);
      }

      if (inputElem === this.valueToInput) {
        this.setValue('valueTo', valueTo + inc);
      }

      if (inputElem === this.minInput) {   
        this.setValue('min', min + inc);
        if (type === 'single') {
          ({ min } = this.rangeSlider.getState());
          this.valueFromInput.value = `${min}`;
        }
      }

      if (inputElem === this.maxInput) {
        this.setValue('max', max + inc);
      }

      if (inputElem === this.stepInput) {
        const incStep = (max - min) / 100;

        if (elem.classList.contains('config__inc')) this.setValue('step', (step + incStep));

        if (elem.classList.contains('config__dec')) this.setValue('step', (step - incStep));
      }
    }
  }

  private setValues(): void {
    let { valueFrom, valueTo } =  this.rangeSlider.getState();
    this.valueFromInput.value = valueFrom.toString();
    this.valueToInput.value = valueTo.toString();
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

  private setOrientation(): void {
    if (this.orientation.checked) {
      this.rangeSlider.setSlider('orientation', 'horizontal');
    } else {
      this.rangeSlider.setSlider('orientation', 'vertical');
    }
  }

  private setSlider(e: Event): void {
    switch (e.target) {
      case this.orientation: this.setOrientation();
        break;
      case this.scale: this.setScale();
        break;
      case this.toolTip: this.setToolTip();
        break;
      case this.type: this.setType();
        break;
    }
  }

  private setSliderValues(e: Event): void {
    switch (e.target) {
      case this.valueFromInput: this.setValue('valueFrom', +this.valueFromInput.value);
        break;
      case this.valueToInput: this.setValue('valueTo', +this.valueToInput.value);
        break;
      case this.minInput: this.setValue('min', +this.minInput.value);
        break;
      case this.maxInput: this.setValue('max', +this.maxInput.value);
        break;
      case this.stepInput: this.setValue('step', +this.stepInput.value);
        break;
    }
  }

  private addListeners(): void {
    const setValuesBind = this.setValues.bind(this);
    this.rangeSlider.sliderOnChange(() => setValuesBind());
    this.configPaneElement.addEventListener('click', (e) => this.changeValues(e));
    this.configPaneElement.addEventListener('click', (e) => this.setSlider(e));
    this.configPaneElement.addEventListener('change', (e) => this.setSliderValues(e));
  }
}

export default ConfigPanel;
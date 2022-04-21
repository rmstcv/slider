import SliderModel from './sliderModel';
import SliderView from './sliderView';

interface InitController {
  min: number,
  max: number,
  step: number,
  setMin: number,
  setMax: number,
  sliderType: 'range' | 'single',
  orientation?: 'vertical' | 'horizontal',
  scale?: boolean,
  toolTip: boolean
}

class SliderController {
  lower: HTMLElement;

  upper: HTMLElement;

  slider: HTMLElement;

  initController: InitController;

  step: number;

  sliderModel: SliderModel;

  sliderView: SliderView;

  sliderWidth: number;

  sliderCurrentValues: number[];

  sliderSize: number;

  constructor(slider: HTMLElement, initController: InitController) {
    this.initController = initController;
    this.slider = slider;
    this.step = this.checkStep(this.initController.step);
    this.sliderSize = Math.abs(this.initController.max - this.initController.min);
    this.sliderModel = new SliderModel({
      sliderMin: this.initController.min,
      sliderMax: this.initController.max,
      step: this.step,
    });
    this.sliderWidth = this.checkSliderOrientation();
    this.sliderView = new SliderView(slider, {
      orientation: initController.orientation,
      sliderType: initController.sliderType,
      min: this.initController.min,
      max: this.initController.max,
      step: this.convertFromCustom(this.step),
      sliderWidth: this.sliderWidth,
      toolTip: initController.toolTip,
    });
    this.lower = this.sliderView.lower;
    this.upper = this.sliderView.upper;
    this.sliderCurrentValues = [initController.min, initController.max];
  }
  
  convertToCustom(value: number) {
    return Math.round((value * ((this.sliderSize) / this.checkSliderOrientation()) + this.initController.min) * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  convertFromCustom(value: number) {
    return value / ((this.sliderSize ) / this.checkSliderOrientation());
  }

  checkStep(step: number) {
    let newStep = step;
    if (step <= 0 || step >= 30 || !step) {
      newStep = (this.sliderSize) / 20;
    }
    return newStep;
  }

  checkSliderOrientation() {
    if (this.initController.orientation === 'vertical') {
      return this.slider.getBoundingClientRect().height!;
    } else {
      return this.slider.getBoundingClientRect().width!;
    }
  }

  updateValues(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    let getCoord = () => {

      if (e instanceof MouseEvent) {
        if (this.initController.orientation === 'vertical') {
          return e.clientY;
        } else {     
          return e.pageX;
        }
      }
      if (window.TouchEvent && e instanceof TouchEvent) {
        if (this.initController.orientation === 'vertical') {
          return e.touches[0].pageY;
        } else {
          return e.touches[0].pageX;
        }
      }
      return process.exit();
    };
    let [min, max]: number[] = [];

    let currentCoord: number = getCoord();
    let clientCoord: number = currentCoord - this.slider.getBoundingClientRect().left;
    
    if (this.initController.orientation === 'vertical') {
      clientCoord = this.slider.getBoundingClientRect().height! - currentCoord + this.slider.getBoundingClientRect().top;
    }
    if (elem === this.lower) {  
      min = this.convertToCustom(clientCoord);
    } 
    if (elem === this.upper) {
      max = this.convertToCustom(clientCoord);
    }
    this.updateSlider([min, max]);
    return [min, max];
  }

  updateSlider([min, max]: number[]) {
    this.sliderCurrentValues = [min, max];
    const [left, right] = this.sliderModel.update([min, max]); 
    this.sliderView.update([left, right]);
  }

  getModelValues() {
    return this.sliderModel.getValues();
  }

  setModelValues([min, max]: number[]) {
    this.sliderCurrentValues = [min, max];
    const [left, right] = this.sliderModel.setValues([min, max]); 
    this.sliderView.update([left, right]);
  }

  setStep(step: number) {
    this.sliderModel.step = step;
  }

  setOrientation(orientation: 'vertical' | 'horizontal') {
    this.initController.orientation = orientation;
    this.sliderView.initView.orientation = orientation;
    this.sliderView.setOrientation(orientation);
  }

  addEvents(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const updateValuesBind = this.updateValues.bind(this, elem);
    const actions = [updateValuesBind];
    const removeEvents = function () {
      actions.forEach((action) => {
        document.removeEventListener('mousemove', action);
        document.removeEventListener('touchmove', action);
      }); 
      document.removeEventListener('mouseup', removeEvents);
      document.removeEventListener('touchend', removeEvents);
      document.onmouseup = null;
      document.ontouchend = null;
    };
    actions.forEach((action) => {
      document.addEventListener('mousemove', action);
      document.addEventListener('touchmove', action);
    }); 
    document.addEventListener('mouseup', removeEvents);
    document.addEventListener('touchend', removeEvents);
    document.ondragstart = function () {
      return false;
    };
  }

  addListeners() {    
    this.upper.addEventListener('mousedown', (e) => this.addEvents(this.upper, e));
    this.lower.addEventListener('mousedown', (e) => this.addEvents(this.lower, e));
    this.upper.addEventListener('touchstart', (e) => this.addEvents(this.upper, e));
    this.lower.addEventListener('touchstart', (e) => this.addEvents(this.lower, e));
  }

  checkSliderType() {
    if (this.initController.sliderType === 'single') {
      this.initController.setMin = 0;
    }
  }

  addScale() {
    if (this.initController.scale) {
      this.sliderView.createScail();
      this.slider.addEventListener('click', (e: Event) => {        
        const elem: HTMLElement = e.target as HTMLElement;
        const value: number = Number(elem.getAttribute('data-value'));
        if (elem.classList.contains('slider__scale-marker-value')) {
          this.sliderView.update([this.initController.min, value]);
          this.sliderModel.setValues([this.initController.min, value]);
        }
      });
    }
  }

  init() {
    this.checkSliderType();
    this.sliderView.init([this.initController.setMin, this.initController.setMax]);
    this.sliderModel.init([this.initController.setMin, this.initController.setMax]);
    this.addListeners();
    this.addScale();
  }
}

export default SliderController;
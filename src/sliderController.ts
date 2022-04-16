import SliderModel from './sliderModel';
import SliderView from './sliderView';
import ToCustomValue from './toCustomValue';

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

  sliderModel: SliderModel;

  sliderView: SliderView;

  initController: InitController;

  sliderWidth: number;

  sliderCirrentValues: number[];

  toCustomValue: ToCustomValue;

  constructor(slider: HTMLElement, initController: InitController) {
    this.initController = initController;
    this.slider = slider;
    this.sliderModel = new SliderModel({
      sliderMin: initController.min,
      sliderMax: initController.max,
      step: initController.step,
    });
    this.toCustomValue = new ToCustomValue(this.slider, initController.max - initController.min, initController.orientation!);
    this.sliderWidth = this.checkSliderOrientation();
    this.sliderView = new SliderView(slider, {
      orientation: initController.orientation,
      sliderType: initController.sliderType,
      max: initController.max - initController.min,
      step: this.toCustomValue.convertFromCustom(initController.step),
      sliderWidth: this.sliderWidth,
      toolTip: initController.toolTip,
    });
    this.lower = this.sliderView.lower;
    this.upper = this.sliderView.upper;
    this.sliderCirrentValues = [initController.min, initController.max];
  }

  checkSliderOrientation() {
    if (this.initController.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical');
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
      clientCoord = currentCoord - this.slider.getBoundingClientRect().top;
    }
    if (elem === this.lower) {
      min = this.toCustomValue.convertToCustom(clientCoord);
    } 
    if (elem === this.upper) {
      max = this.toCustomValue.convertToCustom(clientCoord);
    }
    this.updateSlider([min, max]);
    return [min, max];
  }

  updateSlider([min, max]: number[]) {
    this.sliderCirrentValues = [min, max];
    const [left, right] = this.sliderModel.update([min, max]); 
    this.sliderView.update([left, right] );
  }

  getModelValues() {
    return this.sliderModel.getValues();
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
          this.updateSlider([0, value]);
        }
      });
    }
  }

  init() {
    this.checkSliderType();
    this.sliderView.init();
    this.addListeners();
    this.updateSlider([this.initController.setMin, this.initController.setMax]);
    this.addScale();
  }
}

export default SliderController;
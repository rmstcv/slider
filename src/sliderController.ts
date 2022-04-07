import SliderModel from './sliderModel';
import SliderView from './sliderView';
import searchElem from './searchElem';
import ToCustomValue from './toCustomValue';

const init = {
  minCoordCustom: 0,
  maxCoordCustom: 30,
  step: 2,
  setMin: 4,
  setMax: 16,
  sliderType: 'range',
  orientation: 'horizontal',
  scale: true,
};

interface InitController {
  sliderLength: number,
  minCoordCustom: number,
  maxCoordCustom: number,
  step: number,
  setMin: number,
  setMax: number,
  sliderType: 'range' | 'single',
  orientation?: 'vertical' | 'horizontal',
  scale?: boolean,
}

class SliderController {
  lower: HTMLElement;

  upper: HTMLElement;

  slider: HTMLElement;

  sliderModel: SliderModel;

  sliderView: SliderView;

  initController: InitController;

  sliderWidth: number;

  toCustomValue: ToCustomValue;

  constructor(slider: HTMLElement, initController: InitController) {
    this.initController = initController;
    this.slider = slider;
    this.sliderWidth = this.checkSliderOrientation() ;
    this.lower = <HTMLElement> searchElem('.slider__handle-lower', this.slider);
    this.upper = <HTMLElement> searchElem('.slider__handle-upper', this.slider);
    this.toCustomValue = new ToCustomValue(this.slider, initController.maxCoordCustom - initController.minCoordCustom, initController.orientation);
    this.sliderModel = new SliderModel({
      minCoordCustom: initController.minCoordCustom,
      maxCoordCustom: initController.maxCoordCustom,
      step: initController.step,
    });
    this.sliderView = new SliderView(slider, {
      orientation: initController.orientation,
      sliderType: initController.sliderType,
      maxCoordCustom: initController.maxCoordCustom - initController.minCoordCustom,
      step: this.toCustomValue.convertFromCustom(initController.step),
      sliderWidth: this.sliderWidth,
    });
  }

  checkSliderOrientation() {
    if (this.initController.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical');
      return this.slider.getBoundingClientRect().height!;
    } else {
      return this.slider.getBoundingClientRect().width!;
    }
  }

  setValues(values: number[]) { 
    let [minCustom, maxCustom] = values;
    this.sliderModel.setMinMaxCustom(minCustom, maxCustom);
    [minCustom, maxCustom] = this.sliderModel.getMinMax();
    
    this.sliderView.shift(this.lower, [minCustom, maxCustom]); 
    this.sliderView.shift(this.upper, [minCustom, maxCustom]); 
    this.sliderView.showValues(this.sliderModel.getMinMaxCustom());
  }

  getValues(e: MouseEvent | TouchEvent, elem: HTMLElement) {
    let getCoord = () => {

      if (e instanceof MouseEvent) {
        if (init.orientation === 'vertical') {
          return e.clientY;
        } else {     
          return e.pageX;
        }
      }
      if (window.TouchEvent && e instanceof TouchEvent) {
        if (init.orientation === 'vertical') {
          return e.touches[0].pageY;
        } else {
          return e.touches[0].pageX;
        }
      }
      return process.exit();
    };
    

    let currentCoord: number = getCoord();
    let clientCoord: number = currentCoord - this.slider.getBoundingClientRect().left;
    
    if (init.orientation === 'vertical') {
      clientCoord = currentCoord - this.slider.getBoundingClientRect().top;
    }
    if (elem === this.lower) {
      this.sliderModel.setNextMin(this.toCustomValue.convertToCustom(clientCoord));
    } 
    if (elem === this.upper) {
      this.sliderModel.setNextMax(this.toCustomValue.convertToCustom(clientCoord));
    }
    let [min, max] = this.sliderModel.getMinMax();
    return [min, max];
  }

  showValues() {
    const [min, max] = this.sliderModel.getMinMaxCustom();
    this.sliderView.showValues([min, max]);
  }

  shift(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    this.sliderView.shift(elem, this.getValues(e, elem));
  }

  addEvents(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const shiftBind = this.shift.bind(this, elem);
    const showValuesBind = this.showValues.bind(this);
    const actions = [shiftBind, showValuesBind];
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
    this.setValues([this.initController.setMin, this.initController.setMax]);
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
      this.slider.addEventListener('click', (e: Event) => {
        const elem: HTMLElement = e.target as HTMLElement;
        const value: number = Number(elem.getAttribute('data-value'));
        if (elem.classList.contains('slider__scale-marker-value')) {
          this.setValues([0, value]);
        }
      });
      this.sliderView.createScail();
    }
  }

  sliderChange() {
    this.slider.parentElement?.addEventListener('onchange', (e) => {
      console.log(e);
    });
  }

  init() {
    this.checkSliderType();
    this.sliderView.init();
    this.addListeners();
    this.addScale();
    this.sliderChange();
  }
}

window.addEventListener('load', () => {
  const controller = new SliderController(document.querySelector('.slider') as HTMLElement, init as InitController);
  controller.init();
});

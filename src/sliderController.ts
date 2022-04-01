import SliderModel from './sliderModel';
import SliderView from './sliderView';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 200,
  step: 20,
  setMin: 40,
  setMax: 160,
  sliderType: 'range',
  orientation: 'horizontal',
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
}

class SliderController {
  lower: HTMLElement;

  upper: HTMLElement;

  slider: HTMLElement;

  sliderModel: SliderModel;

  sliderView: SliderView;

  initController: InitController;

  constructor(slider: HTMLElement, initController: InitController) {
    this.slider = slider;
    this.lower = <HTMLElement> this.searchElem('.slider__handle-lower');
    this.upper = <HTMLElement> this.searchElem('.slider__handle-upper');
    this.sliderModel = new SliderModel({
      sliderLength: initController.sliderLength,
      minCoordCustom: initController.minCoordCustom,
      maxCoordCustom: initController.maxCoordCustom,
      step: initController.step,
    });
    this.sliderView = new SliderView(slider, {
      sliderLength: initController.sliderLength, 
      orientation: initController.orientation,
      sliderType: initController.sliderType,
    });
    this.initController = initController;
  }

  searchElem(selector: string) {
    const elems: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
    let checkElem = (item: HTMLElement) => {

      if (item.parentElement === this.slider) {
        return item;
      } else if (item.parentElement){
        checkElem(item.parentElement);
      }
    };
    const check = () => {
      for (let i = 0; i < elems.length; i ++) {
        checkElem(elems[i]);
        if (checkElem(elems[i])) {
          return elems[i];
        }
      }
    }; 
    return check();
  }

  setValues(values: number[]) {
    const [minCustom, maxCustom] = values;
    this.sliderModel.setMinMaxCustom(minCustom, maxCustom);
    this.sliderView.shift(this.lower, this.sliderModel.getMinMax()); 
    this.sliderView.shift(this.upper, this.sliderModel.getMinMax()); 
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
      this.sliderModel.setNextMin(clientCoord);  
    } 
    if (elem === this.upper) {
      this.sliderModel.setNextMax(clientCoord);
    }
    return this.sliderModel.getMinMax();
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

  init() {
    this.checkSliderType();
    this.sliderView.init();
    this.addListeners();
  }
}

const controller = new SliderController(document.querySelector('.slider') as HTMLElement, init as InitController);

controller.init();
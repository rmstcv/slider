import SliderModel from './sliderModel';
import SliderView from './sliderView';
import searchElem from './searchElem';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 200,
  step: 20,
  setMin: 40,
  setMax: 160,
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

  constructor(slider: HTMLElement, initController: InitController) {
    this.slider = slider;
    this.lower = <HTMLElement> searchElem('.slider__handle-lower', this.slider);
    this.upper = <HTMLElement> searchElem('.slider__handle-upper', this.slider);
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
      maxCoordCustom: initController.maxCoordCustom,
      step: initController.step,
    });
    this.initController = initController;
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

  init() {
    this.checkSliderType();
    this.sliderView.init();
    this.addListeners();
    this.addScale();
  }
}

const controller = new SliderController(document.querySelector('.slider') as HTMLElement, init as InitController);

controller.init();
import SliderModel from './sliderModel';
import SliderView from './sliderView';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 100,
  step: 10,
  setMin: 10,
  setMax: 50,
  sliderType: 'range',
};

class SliderController {
  lower: HTMLElement;

  upper: HTMLElement;

  slider: HTMLElement;

  sliderModel: SliderModel;

  sliderView: SliderView;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.lower = this.searchElem('.slider__handle-lower');
    this.upper = this.searchElem('.slider__handle-upper');
    this.sliderModel = new SliderModel(init);
    this.sliderView = new SliderView(slider, init.sliderLength);
  }

  searchElem(selector: string) {
    const elems = document.querySelectorAll(selector);
    let targetElem: HTMLElement;
    let parentElem: HTMLElement;
    let checkElem = (item: HTMLElement) => {
      if (item.parentElement === this.slider) {
        parentElem = item;
      } else if (item.parentElement){
        checkElem(item.parentElement);
      } else {
        return;
      }
    };

    elems.forEach((elem: HTMLElement) => {
      checkElem(elem);
      if (parentElem) {
        targetElem = elem;
      }
    });
    return targetElem;
  }

  setValues(values: number[]) {
    const [minCustom, maxCustom] = values;
    this.sliderModel.setMinMaxCustom(minCustom, maxCustom);
    this.sliderView.shift(this.lower, this.sliderModel.getMinMax()); 
    this.sliderView.shift(this.upper, this.sliderModel.getMinMax()); 
    this.sliderView.showValues(this.sliderModel.getMinMaxCustom());
  }

  getValues(e: MouseEvent | TouchEvent, elem: HTMLElement) {
    let pagex: number;
    if (e instanceof MouseEvent) {
      pagex = e.pageX;
    }
    if (e instanceof TouchEvent) {
      pagex = e.touches[0].pageX;
    }

    if (elem === this.lower) {
      this.sliderModel.setNextMin(pagex - this.slider.getBoundingClientRect().left);
    } 
    if (elem === this.upper) {
      this.sliderModel.setNextMax(pagex - this.slider.getBoundingClientRect().left);
    }
    return this.sliderModel.getMinMax();
  }

  showValues() {
    const [min, max] = this.sliderModel.getMinMaxCustom();
    this.sliderView.showValues([min, max]);
  }

  shift(elem: HTMLElement, e: MouseEvent) {
    this.sliderView.shift(elem, this.getValues(e, elem));  
  }

  addEvents(elem: HTMLElement) {
    const shiftBind = this.shift.bind(this, elem);
    const showValuesBind = this.showValues.bind(this);
    const events = [shiftBind, showValuesBind];
    const removeEvents = function () {
      events.forEach((item) => {
        document.removeEventListener('mousemove', item);
        document.removeEventListener('touchmove', item);
      }); 
      document.removeEventListener('mouseup', removeEvents);
      document.removeEventListener('touchend', removeEvents);
      document.onmouseup = null;
      document.ontouchend = null;
    };
    events.forEach((item) => {
      document.addEventListener('mousemove', item);
      document.addEventListener('touchmove', item);
    }); 
    document.addEventListener('mouseup', removeEvents);
    document.addEventListener('touchend', removeEvents);
    document.ondragstart = function () {
      return false;
    };
  }

  addListeners() {    
    this.setValues([init.setMin, init.setMax]);
    this.upper.addEventListener('mousedown', () => this.addEvents(this.upper));
    this.lower.addEventListener('mousedown', () => this.addEvents(this.lower));
    this.upper.addEventListener('touchstart', () => this.addEvents(this.upper));
    this.lower.addEventListener('touchstart', () => this.addEvents(this.lower));
  }

  checkSliderType() {
    if (init.sliderType === 'single') {
      this.lower.style.display = 'none';
      init.setMin = 0;
    }
  }

  init() {
    this.checkSliderType();
    this.addListeners();
  }
}

const controller = new SliderController(document.querySelector('.slider'));

controller.init();
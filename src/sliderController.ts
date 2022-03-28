import SliderModel from './sliderModel';
import SliderView from './sliderView';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 100,
  step: 10,
  setMin: 10,
  setMax: 50,
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
    let checkElem = (checkedElem: HTMLElement) => {

      if (checkedElem.parentElement === this.slider) {
        targetElem = checkedElem;
      } else if (targetElem !== undefined){
        checkElem(checkedElem.parentElement);
      } else {
        targetElem = this.slider;
      }
    };
    elems.forEach((item: HTMLElement) => {
      checkElem(item);
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

  getValues(e: MouseEvent, elem: HTMLElement) {

    if (elem === this.lower) {
      this.sliderModel.setNextMin(e.pageX - this.slider.getBoundingClientRect().left);
    } 
    if (elem === this.upper) {
      this.sliderModel.setNextMax(e.pageX - this.slider.getBoundingClientRect().left);
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
    const removeMouseUp = function mouseUpClear() {
      document.removeEventListener('mousemove', shiftBind);
      document.removeEventListener('mousemove', showValuesBind);
      document.removeEventListener('mouseup', removeMouseUp);
      document.onmouseup = null;
    };
    document.addEventListener('mousemove', shiftBind);
    document.addEventListener('mousemove', showValuesBind);
    document.addEventListener('mouseup', removeMouseUp);
    document.ondragstart = function () {
      return false;
    };
  }

  addListeners() {    
    this.sliderView.showValues(this.sliderModel.getMinMaxCustom());
    this.setValues([init.setMin, init.setMax]);
    this.upper.addEventListener('mousedown', () => this.addEvents(this.upper));
    this.lower.addEventListener('mousedown', () => this.addEvents(this.lower));
  }
}

const controller = new SliderController(document.querySelector('.slider'));

controller.addListeners();
import SliderModel from './sliderModel';
import SliderView from './sliderView';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 100,
  step: 10,
};

const sliderModel = new SliderModel(init);
const sliderView = new SliderView(document.querySelector('.slider'), init.sliderLength);

class SliderController {
  lower: HTMLElement = document.querySelector('.slider__handle-lower');

  upper: HTMLElement = document.querySelector('.slider__handle-upper');

  slider: HTMLElement = document.querySelector('.slider');

  constructor() {
    this.slider = document.querySelector('.slider');
  }

  getValues(e: MouseEvent, elem: HTMLElement) {

    if (elem === this.lower) {
      sliderModel.setMin(e.pageX - this.slider.getBoundingClientRect().left);
    } 
    if (elem === this.upper) {
      sliderModel.setMax(e.pageX - this.slider.getBoundingClientRect().left);
    } 

    return sliderModel.getMinMax();
  }

  showValues() {
    const [min, max] = sliderModel.getMinMaxCustom();
    sliderView.showValues([min, max]);
  }


  shiftBind(elem: HTMLElement, e: MouseEvent) {
    
    sliderView.shift(elem, this.getValues(e, elem));  
  }

  addEvents(elem: HTMLElement) {
    
    const shift = this.shiftBind.bind(this, elem);

    document.addEventListener('mousemove', shift);
    document.addEventListener('mousemove', this.showValues);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', shift);
      document.removeEventListener('mousemove', this.showValues);
      document.onmouseup = null;
    });
    document.ondragstart = function () {
      return false;
    };
  }

  addListeners() {
    sliderView.showValues(sliderModel.getMinMaxCustom());
    this.upper.addEventListener('mousedown', () => this.addEvents(this.upper));
    this.lower.addEventListener('mousedown', () => this.addEvents(this.lower));
  }
}

const controller = new SliderController();

controller.addListeners();
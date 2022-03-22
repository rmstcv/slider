import { init, sliderLogic } from '../src/sliderController';

class SliderView {

  slider: HTMLElement;

  currentLowValue: number;

  currentUpperValue: number;

  constructor(slider: HTMLElement, sliderLength: number) {
    this.slider = slider;
    this.currentLowValue = 0;
    this.currentUpperValue = sliderLength;
  }

  findElem(selector: string) {
    const elems = document.querySelectorAll(selector);
    let targetElem: HTMLElement;
    
    elems.forEach((elem: HTMLElement) => {
      if (elem.parentNode === this.slider) {
        targetElem = elem;
      }
    });
    
    return targetElem;
  }

  progressHighlight(minCoord: number, maxCoord: number) {
    const sliderHighlight: HTMLElement = this.findElem('.slider__highlight');
    const progressLength = maxCoord - minCoord;
    if ( progressLength >= 0 ) {
      sliderHighlight.style.width = progressLength + 'px';
      sliderHighlight.style.left = minCoord - this.slider.getBoundingClientRect().left + 'px';
    } else {
      sliderHighlight.style.width = 0 + 'px';
    }
  } 

  showValues() {
    document.querySelector('.slider__values-lower').innerHTML = sliderLogic.toCustomValue(this.currentLowValue).toString();
    document.querySelector('.slider__values-upper').innerHTML = sliderLogic.toCustomValue(this.currentUpperValue).toString();
  }

  shift(elem: HTMLElement, e: MouseEvent) {
    const lower = this.findElem('.slider__handle-lower');
    const upper = this.findElem('.slider__handle-upper');
    const minCoord = lower.getBoundingClientRect().right;
    const maxCoord = upper.getBoundingClientRect().left;
    const sliderLeftCoord = this.slider.getBoundingClientRect().left;
    const sliderRightCoord = this.slider.getBoundingClientRect().right;
  
    let minCoordShift = minCoord - lower.offsetWidth / 2 - sliderLeftCoord;
    let maxCoordShift = maxCoord - sliderLeftCoord - lower.offsetWidth / 2;
    
    if (elem === lower) {
      minCoordShift = 0;
      maxCoordShift = maxCoord + lower.offsetWidth / 2 - sliderLeftCoord;
      this.currentLowValue = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord, minCoordShift, maxCoordShift);
      lower.style.zIndex = '10';
      upper.style.zIndex = '1';
      elem = lower;    
    }
    if (elem === upper) {
      minCoordShift = minCoord - upper.offsetWidth - sliderLeftCoord + upper.offsetWidth / 2;
      maxCoordShift = sliderRightCoord - sliderLeftCoord;
      this.currentUpperValue = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord, minCoordShift, maxCoordShift);
      upper.style.zIndex = '10';
      lower.style.zIndex = '1';
      elem = upper;
    }
    
    elem.style.left = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord, minCoordShift, maxCoordShift) + 'px';
    this.showValues();
    this.progressHighlight(minCoord, maxCoord);
  }
  
  addEvents(elem: HTMLElement) {
    const bindShift = this.shift.bind(this, elem);
    
    document.addEventListener('mousemove', bindShift);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', bindShift);
      document.onmouseup = null;
    });
    document.ondragstart = function () {
      return false;
    };
  }

  init() {
    const lower = this.findElem('.slider__handle-lower');
    const upper = this.findElem('.slider__handle-upper');
    this.showValues();
    upper.addEventListener('mousedown', () => this.addEvents(upper));
    lower.addEventListener('mousedown', () => this.addEvents(lower));
    
  }
}

const sliderView = new SliderView(document.querySelector('.slider'), init.sliderLength);
sliderView.init();

import './sliderCreater';

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

  progressHighlight() {
    const sliderHighlight: HTMLElement = this.findElem('.slider__highlight');
    const progressLength = this.currentUpperValue - this.currentLowValue;
    
    if ( progressLength >= 0 ) {
      sliderHighlight.style.width = progressLength + 'px';
      sliderHighlight.style.left = this.currentLowValue + 'px';
    } else {
      sliderHighlight.style.width = 0 + 'px';
    }
  } 

  showValues(minMax: number[]) {
    const [min, max] = minMax;
    const lower: HTMLInputElement = document.querySelector('.slider__values-lower');
    lower.value = min.toString();
    const upper: HTMLInputElement = document.querySelector('.slider__values-upper');
    upper.value = max.toString(); 
  }

  checkExtremumCoords(coordCurrent: number, min: number, max: number) {
    let coordChecked = coordCurrent;
    
    if (coordCurrent < min) {
      coordChecked = min;
    }
    if (coordChecked > max) {
      coordChecked = max;
    }    
    return coordChecked;
  }

  shift(elem: HTMLElement, coords: number[]) {
    
    const lower = this.findElem('.slider__handle-lower');
    const upper = this.findElem('.slider__handle-upper');
    let [min, max] = coords;

    if (elem === lower) {
      lower.style.zIndex = '10';
      upper.style.zIndex = '1';
      elem.style.left = min + 'px';
      this.currentLowValue = min;
    }
    if (elem === upper) {
      upper.style.zIndex = '10';
      lower.style.zIndex = '1';
      elem.style.left = max + 'px';
      this.currentUpperValue = max;
    }
    this.progressHighlight();
  }
}

export default SliderView;
import './sliderCreater';

class SliderView {

  slider: HTMLElement;

  currentLowValue: number;

  currentUpperValue: number;

  lower: HTMLElement;

  upper: HTMLElement;

  constructor(slider: HTMLElement, sliderLength: number) {
    this.slider = slider;
    this.currentLowValue = 0;
    this.currentUpperValue = sliderLength;
    this.lower = this.findElem('.slider__handle-lower');
    this.upper = this.findElem('.slider__handle-upper');
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
    const lowerCount: HTMLElement = document.querySelector('.slider__handle-lower-count');
    lowerCount.innerHTML = min.toString();
    const upperCount: HTMLElement = document.querySelector('.slider__handle-upper-count');
    upperCount.innerHTML = max.toString(); 
    if (min === max) {
      lowerCount.style.opacity = '0';
    } else {
      lowerCount.style.opacity = '1';
    }
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
    
    let [min, max] = coords;

    if (elem === this.lower) {
      this.lower.style.zIndex = '10';
      this.upper.style.zIndex = '1';
      elem.style.left = min + 'px';
      this.currentLowValue = min;
    }
    if (elem === this.upper) {
      this.upper.style.zIndex = '10';
      this.lower.style.zIndex = '1';
      elem.style.left = max + 'px';
      this.currentUpperValue = max;
    }
    this.progressHighlight();
  }
}

export default SliderView;
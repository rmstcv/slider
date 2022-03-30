import './sliderCreater';

class SliderView {

  slider: HTMLElement;

  currentLowValue: number;

  currentUpperValue: number;

  lower: HTMLElement;

  upper: HTMLElement;

  progressBar: HTMLElement;

  constructor(slider: HTMLElement, sliderLength: number) {
    this.slider = slider;
    this.currentLowValue = 0;
    this.currentUpperValue = sliderLength;
    this.lower = this.searchElem('.slider__handle-lower');
    this.upper = this.searchElem('.slider__handle-upper');
    this.progressBar = this.searchElem('.slider__highlight');
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

  progressBarHighlight() {
    const progressLength = this.currentUpperValue - this.currentLowValue;
    
    if ( progressLength >= 0 ) {
      this.progressBar.style.width = progressLength + 'px';
      this.progressBar.style.left = this.currentLowValue + 'px';
    } else {
      this.progressBar.style.width = 0 + 'px';
    }
  } 

  showValues(minMax: number[]) {
    const [min, max] = minMax;
    const lowerCount: HTMLElement = this.searchElem('.slider__handle-lower-count');
    lowerCount.innerHTML = min.toString();
    const upperCount: HTMLElement = this.searchElem('.slider__handle-upper-count');
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
    this.progressBarHighlight();
  }
}

export default SliderView;
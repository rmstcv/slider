import './sliderCreater';

interface InitView {
  sliderLength: number;
  orientation?: 'vertical' | 'horizontal',
  sliderType: 'range' | 'single',
}

class SliderView {

  slider: HTMLElement;

  currentLowValue: number;

  currentUpperValue: number;

  lower: HTMLElement;

  upper: HTMLElement;

  lowerCount: HTMLElement;

  upperCount: HTMLElement;

  progressBar: HTMLElement;

  initView: InitView;

  constructor(slider: HTMLElement, initView: InitView) {
    this.slider = slider;
    this.currentLowValue = 0;
    this.currentUpperValue = initView.sliderLength;
    this.lower = this.searchElem('.slider__handle-lower') as HTMLElement;
    this.upper = this.searchElem('.slider__handle-upper') as HTMLElement;
    this.lowerCount = this.searchElem('.slider__handle-lower-count') as HTMLElement;
    this.upperCount = this.searchElem('.slider__handle-upper-count') as HTMLElement;
    this.progressBar = this.searchElem('.slider__highlight') as HTMLElement;
    this.initView = initView;
  }

  searchElem(selector: string) {
    const elems: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
    let checkElem = (item: HTMLElement) => {

      if (item.parentElement === this.slider) {
        return item;
      } else if (item.parentElement){
        checkElem(item.parentElement);
      }
      return item;
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

  progressBarHighlight() {
    const progressLength = this.currentUpperValue - this.currentLowValue; 

    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
      if ( progressLength >= 0 ) {
        this.progressBar.style.width = progressLength + 'px';
        this.progressBar.style.left = this.currentLowValue + 'px';
      } else {
        this.progressBar.style.width = 0 + 'px';
      }
    }
    if (this.initView.orientation === 'vertical') {
      if ( progressLength >= 0 ) {
        this.progressBar.style.height = progressLength + 'px';
        this.progressBar.style.top = this.currentLowValue + 'px';
      } else {
        this.progressBar.style.height = 0 + 'px';
      }
    }
  } 

  showValues(minMax: number[]) {
    const [min, max] = minMax;
    this.lowerCount.innerHTML = min.toString();
    this.upperCount.innerHTML = max.toString();

    if (min === max) {
      this.lowerCount.style.opacity = '0';
    } else {
      this.lowerCount.style.opacity = '1';
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
      if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
        elem.style.left = min + 'px';
      }
      if (this.initView.orientation === 'vertical') {
        elem.style.top = min + 'px';
      }
      this.currentLowValue = min;
    }
    if (elem === this.upper) {
      this.upper.style.zIndex = '10';
      this.lower.style.zIndex = '1';
      if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
        elem.style.left = max + 'px';
      }
      if (this.initView.orientation === 'vertical') {
        elem.style.top = max + 'px';
      }
      this.currentUpperValue = max;
    }
    this.progressBarHighlight();
  }

  checkSliderType() {
    if (this.initView.sliderType === 'single') {
      this.lower.style.display = 'none';
    }
  }

  checkSliderOrientation() {
    this.slider.style.width = `${this.initView.sliderLength}px`;
    this.slider.style.height = '20px';
    if (this.initView.orientation === 'vertical') {
      this.slider.style.width = '20px';
      this.slider.style.height = `${this.initView.sliderLength}px`;
      this.lower.style.top = '0'; 
      this.lower.style.left = '50%'; 
      this.upper.style.top = `${this.initView.sliderLength}px`; 
      this.upper.style.left = '50%'; 
      this.lowerCount.classList.add('slider__handle-upper-count_vertical');
      this.upperCount.classList.add('slider__handle-lower-count_vertical');
    }
  }

  init() {
    this.checkSliderType();
    this.checkSliderOrientation();
  }
}

export default SliderView;
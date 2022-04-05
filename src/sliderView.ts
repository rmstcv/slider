import './sliderCreater';
import SliderScale from './sliderScale';
import searchElem from './searchElem';

interface InitView {
  orientation?: 'vertical' | 'horizontal',
  sliderType: 'range' | 'single',
  maxCoordCustom: number,
  step: number,
  sliderWidth: number,
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

  sliderScale: SliderScale;

  sliderLength: number;

  constructor(slider: HTMLElement, initView: InitView) {
    this.initView = initView;
    this.slider = slider;
    this.currentLowValue = 0;
    this.sliderLength = this.initView.sliderWidth;
    this.currentUpperValue = this.sliderLength;
    this.lower = searchElem('.slider__handle-lower', this.slider) as HTMLElement;
    this.upper = searchElem('.slider__handle-upper', this.slider) as HTMLElement;
    this.lowerCount = searchElem('.slider__handle-lower-count', this.slider) as HTMLElement;
    this.upperCount = searchElem('.slider__handle-upper-count', this.slider) as HTMLElement;
    this.progressBar = searchElem('.slider__highlight', this.slider) as HTMLElement;
    this.sliderScale = new SliderScale(this.slider, {
      maxCoordCustom: this.initView.maxCoordCustom,
      step: this.initView.step,
      orientation: this.initView.orientation,
      sliderWidth: this.initView.sliderWidth,
    });
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

    if (this.initView.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical');
      // this.slider.style.height = `${this.sliderLength}px`;
      // this.upper.style.top = `${this.sliderLength}px`;   
    }
  }

  createScail() {
    this.sliderScale.init();
  }

  init() {
    this.checkSliderType();
    this.checkSliderOrientation();
  }
}

export default SliderView;
import sliderCreater from './sliderCreater';
import SliderScale from './sliderScale';
import sliderToolTip from './sliderToolTip';
import searchElem from './searchElem';

interface InitView {
  orientation?: 'vertical' | 'horizontal',
  sliderType: 'range' | 'single',
  max: number,
  step: number,
  sliderWidth: number,
  toolTip: boolean,
}

class SliderView {

  slider: HTMLElement;

  currentLowValue: number;

  currentUpperValue: number;

  lower: HTMLElement;

  upper: HTMLElement;

  progressBar: HTMLElement;

  initView: InitView;

  sliderScale: SliderScale;

  sliderToolTip: sliderToolTip;

  sliderView: void;

  constructor(slider: HTMLElement, initView: InitView) {
    this.initView = initView;
    this.slider = slider;
    this.sliderView = sliderCreater(this.slider);
    this.currentLowValue = 0;
    this.currentUpperValue = 100;
    this.lower = searchElem('.slider__handle-lower', this.slider) as HTMLElement;
    this.upper = searchElem('.slider__handle-upper', this.slider) as HTMLElement;
    this.progressBar = searchElem('.slider__highlight', this.slider) as HTMLElement;
    this.sliderScale = new SliderScale(this.slider, {
      maxCustom: this.initView.max,
      step: this.initView.step,
      orientation: this.initView.orientation,
      sliderWidth: this.initView.sliderWidth,
    });
    this.sliderToolTip = new sliderToolTip(this.slider);
  }

  progressBarHighlight() {
    const progressLength = this.currentUpperValue - this.currentLowValue;     
    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
      if ( progressLength >= 0 ) {
        this.progressBar.style.width = progressLength + '%';
        this.progressBar.style.left = this.currentLowValue + '%';
      } else {
        this.progressBar.style.width = 0 + '%';
      }
    }
    if (this.initView.orientation === 'vertical') {
      if ( progressLength >= 0 ) {
        this.progressBar.style.height = progressLength + '%';
        this.progressBar.style.top = this.currentLowValue + '%';
      } else {
        this.progressBar.style.height = 0 + '%';
      }
    }
  } 

  checkSliderType() {
    if (this.initView.sliderType === 'single') {
      this.lower.style.display = 'none';
    }
  }

  checkSliderOrientation() {
    if (this.initView.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical'); 
    }
  }

  createScail() {
    this.sliderScale.init();
  }

  convertToPercent(customValue: number) {
    return (100 / this.initView.max) * customValue;
  }

  shiftLeftHandler(value: number) {
    this.lower.style.zIndex = '10';
    this.upper.style.zIndex = '1';
    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
      this.lower.style.left = value + '%';
    }
    if (this.initView.orientation === 'vertical') {
      this.lower.style.top = value + '%';
    }
    this.currentLowValue = value;
  }

  shiftRightHandler(value: number) {
    this.upper.style.zIndex = '10';
    this.lower.style.zIndex = '1';
    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
      this.upper.style.left = value + '%';
    }
    if (this.initView.orientation === 'vertical') {
      this.upper.style.top = value + '%';
    }
    this.currentUpperValue = value;
  }
  
  update([min, max]: number[]) { 
    if (min !== undefined) {
      this.shiftLeftHandler(this.convertToPercent(min));
      this.lower.setAttribute('data-lower', `${min}`);
    }
    if (max !== undefined) {
      this.shiftRightHandler(this.convertToPercent(max));
      this.upper.setAttribute('data-upper', `${max}`);
    }
    this.progressBarHighlight();

    if (this.initView.toolTip) {
      this.sliderToolTip.update([min, max]);
    }
  }

  init() {
    this.checkSliderType();
    this.checkSliderOrientation();
  }
}

export default SliderView;
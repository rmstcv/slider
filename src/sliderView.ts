import sliderCreater from './sliderCreater';
import SliderScale from './sliderScale';
import sliderToolTip from './sliderToolTip';
import searchElem from './searchElem';

interface InitView {
  orientation?: 'vertical' | 'horizontal',
  sliderType: 'range' | 'single',
  min: number,
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
      minCustom: this.initView.min,
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
        this.progressBar.style.top = 100 - this.currentUpperValue + '%';
      } else {
        this.progressBar.style.height = 0 + '%';
      }
    }
  } 

  checkSliderType() {
    if (this.initView.sliderType === 'single') {
      this.lower.style.display = 'none';
    }
    if (this.initView.sliderType === 'range') {
      this.lower.style.display = 'block';
    }
  }

  checkSliderOrientation() {
    if (this.initView.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical'); 
    } else {
      this.slider.classList.remove('slider_vertical'); 
    }
  }

  setToolTip() {
    if (!this.initView.toolTip) {
      this.initView.toolTip = true;
    } else {
      this.initView.toolTip = false;
    }
    this.sliderToolTip.setToolTip();
  }

  createScail() {
    this.sliderScale.init();
  }

  convertToPercent(customValue: number) {
    return (100 / Math.abs(this.initView.max - this.initView.min)) * (-this.initView.min + customValue);
  }

  shiftLeftHandler(value: number) {
    this.lower.style.zIndex = '10';
    this.upper.style.zIndex = '1';
    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
      this.lower.style.left = value + '%';
    }
    if (this.initView.orientation === 'vertical') {
      this.lower.style.top = 100 - value + '%';
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
      this.upper.style.top = 100 - value + '%';
    }
    this.currentUpperValue = value;
  }
  
  update([min, max]: number[]) { 
    if (min !== undefined) {
      min = parseFloat((min).toFixed(this.initView.max.toString().length));
      this.shiftLeftHandler(this.convertToPercent(min));
      this.lower.setAttribute('data-lower', `${min}`);
    }
    if (max !== undefined) {
      max = parseFloat((max).toFixed(this.initView.max.toString().length));
      this.shiftRightHandler(this.convertToPercent(max));
      this.upper.setAttribute('data-upper', `${max}`);
    }
    this.progressBarHighlight();

    if (this.initView.toolTip) {
      this.sliderToolTip.update([min, max]);
    }
  }

  setOrientation(orientation: 'vertical' | 'horizontal') {

    if (orientation === 'vertical') {
      this.upper.style.left = '';
      this.lower.style.left = '';
      this.progressBar.style.width = '';
      this.progressBar.style.left = '';
    }
    if (orientation === 'horizontal') {
      this.upper.style.top = '';
      this.lower.style.top = '';
      this.progressBar.style.height = '';
      this.progressBar.style.top = '';
    }

    this.checkSliderOrientation();
    this.progressBarHighlight();
    this.update([+this.lower.getAttribute('data-lower')!, +this.upper.getAttribute('data-upper')!]);
    this.sliderScale.initViewScale.orientation = orientation;
    this.sliderScale.init();
  }

  setType(type: 'range' | 'single') {
    this.initView.sliderType = type;
    this.checkSliderType();
  }

  init([min, max]: number[]) {
    this.update([min, max]);
    this.checkSliderType();
    this.checkSliderOrientation();
  }
}

export default SliderView;
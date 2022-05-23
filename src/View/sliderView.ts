import SliderController from '../Controller/sliderController';
import sliderCreater from './subViews/sliderCreater';
import SliderScale from './subViews/sliderScale';
import SliderToolTip from './subViews/sliderToolTip';
import searchElem from '../searchElem';

class SliderView {

  private slider: HTMLElement;

  private currentLowValue: number = 0;

  private currentUpperValue: number = 100;

  private lower!: HTMLElement;

  private upper!: HTMLElement;

  private progressBar!: HTMLElement;

  private initView: Init;

  private sliderScale!: SliderScale;

  sliderToolTip!: SliderToolTip;

  sliderController: SliderController;

  constructor(slider: HTMLElement, controller: SliderController, initView: Init) {
    this.initView = initView;
    this.slider = slider;
    this.sliderController = controller;
    this.init();
  }

  private init(): void {
    sliderCreater(this.slider);
    this.sliderScale = new SliderScale(this.slider, this.initView);
    this.sliderToolTip = new SliderToolTip(this.slider, this.initView);
    this.searchElems();
    this.addListeners();
    this.update([this.initView.setMin, this.initView.setMax]);
    this.checkSliderOrientation();
  }

  private searchElems(): void {
    this.lower = searchElem('.slider__handle-lower', this.slider) as HTMLElement;
    this.upper = searchElem('.slider__handle-upper', this.slider) as HTMLElement;
    this.progressBar = searchElem('.slider__highlight', this.slider) as HTMLElement;
  }

  private progressBarHighlight(): void {
    const progressLength = this.currentUpperValue - this.currentLowValue; 

    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {

      if ( progressLength >= 0 ) {
        this.progressBar.style.width = progressLength + '%';
        this.progressBar.style.left = this.currentLowValue + '%';
      }
    }

    if (this.initView.orientation === 'vertical') {

      if ( progressLength >= 0 ) {
        this.progressBar.style.height = progressLength + '%';
        this.progressBar.style.top = 100 - this.currentUpperValue + '%';
      }
    }
  } 

  private checkSliderOrientation(): void {
    if (this.initView.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical'); 
    } else {
      this.slider.classList.remove('slider_vertical'); 
    }
  }

  public setToolTip(): void {
    this.initView.toolTip = this.initView.toolTip ? false : true;
    this.sliderToolTip.setToolTip();
  }

  private toolTipUpdate([min, max]: number[]): void {
    this.sliderToolTip.update([min, max]);
  }

  public setType(type: 'range' | 'single'): void {
    this.initView.sliderType = type;

    if (this.initView.sliderType === 'single') {
      this.lower.classList.add('slider__handle-lower_hidden');
    } else {
      this.lower.classList.remove('slider__handle-lower_hidden');
    }
  }

  public setScale(): void {
    this.sliderScale.setScale();
  }

  private setValuesFromScale(target: HTMLElement) {
    if (this.initView.scale) {
      const value = this.sliderScale.getScaleValues(target as HTMLElement);

      if (value !== undefined) this.sliderController.updateSliderFromScale(value);
    }
  }

  convertToPercent(customValue: number) {
    return (100 / Math.abs(this.initView.max - this.initView.min)) * (-this.initView.min + customValue);
  }

  toggleHandlersOrder(handle: HTMLElement) {
    if (handle === this.lower && !this.lower.classList.contains('slider__handle-lower_z-index-up')) {
      this.lower.classList.add('slider__handle-lower_z-index-up');
      this.upper.classList.remove('slider__handle-upper_z-index-up');
    }
    if (handle === this.upper && !this.upper.classList.contains('slider__handle-upper_z-index-up')) {
      this.upper.classList.add('slider__handle-upper_z-index-up');
      this.lower.classList.remove('slider__handle-lower_z-index-up');
    }
  }

  shiftLeftHandler(value: number) {
    this.toggleHandlersOrder(this.lower);
    if (!this.initView.orientation || this.initView.orientation === 'horizontal') {
      this.lower.style.left = value + '%';
    }
    if (this.initView.orientation === 'vertical') {
      this.lower.style.top = 100 - value + '%';
    }
    this.currentLowValue = value;
  }

  shiftRightHandler(value: number) {
    this.toggleHandlersOrder(this.upper);
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
    this.toolTipUpdate([min, max]);
    this.progressBarHighlight();
    
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
    this.initView.orientation = orientation;
    this.sliderScale.destroyScale();
    this.sliderScale.setScale();
  }

  checkSliderOrientation1() {
    if (this.initView.orientation === 'vertical') {
      return this.slider.getBoundingClientRect().height!;
    } else {
      return this.slider.getBoundingClientRect().width!;
    }
  }

  convertToCustom(value: number) {
    const pow = this.initView.max.toString().length;
    return Math.round((value * ((Math.abs(this.initView.max - this.initView.min)) / this.checkSliderOrientation1()) + this.initView.min) * Math.pow(10, pow)) / Math.pow(10, pow);
  }

  convertFromCustom(value: number) {
    return value / ((Math.abs(this.initView.max - this.initView.min)) / this.checkSliderOrientation1());
  }

  updateValues(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    let getCoord = () => {

      if (e instanceof MouseEvent) {
        if (this.initView.orientation === 'vertical') {
          return e.clientY;
        } else {     
          return e.pageX;
        }
      }
      if (window.TouchEvent && e instanceof TouchEvent) {
        if (this.initView.orientation === 'vertical') {
          return e.touches[0].pageY;
        } else {
          return e.touches[0].pageX;
        }
      }
      return process.exit();
    };
    let [min, max]: number[] = [];

    let currentCoord: number = getCoord();
    let clientCoord: number = currentCoord - this.slider.getBoundingClientRect().left;
    
    if (this.initView.orientation === 'vertical') {
      clientCoord = this.slider.getBoundingClientRect().height! - currentCoord + this.slider.getBoundingClientRect().top;
    }
    if (elem === this.lower) {  
      min = this.convertToCustom(clientCoord);
    } 
    if (elem === this.upper) {
      max = this.convertToCustom(clientCoord);
    }
    this.sliderController.updateSlider([min, max]);
    return [min, max];
  }

  addEvents(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const updateValuesBind = this.updateValues.bind(this, elem);
    const actions = [updateValuesBind];
    const removeEvents = function () {
      actions.forEach((action) => {
        document.removeEventListener('mousemove', action);
        document.removeEventListener('touchmove', action);
      }); 
      document.removeEventListener('mouseup', removeEvents);
      document.removeEventListener('touchend', removeEvents);
      document.onmouseup = null;
      document.ontouchend = null;
    };
    actions.forEach((action) => {
      document.addEventListener('mousemove', action);
      document.addEventListener('touchmove', action);
    }); 
    document.addEventListener('mouseup', removeEvents);
    document.addEventListener('touchend', removeEvents);
    document.ondragstart = function () {
      return false;
    };
  }

  addListeners() {    
    this.upper.addEventListener('mousedown', (e) => this.addEvents(this.upper, e));
    this.lower.addEventListener('mousedown', (e) => this.addEvents(this.lower, e));
    this.upper.addEventListener('touchstart', (e) => this.addEvents(this.upper, e));
    this.lower.addEventListener('touchstart', (e) => this.addEvents(this.lower, e));
    this.slider.addEventListener('click', (e) => this.setValuesFromScale(e.target as HTMLElement));
  }
}

export default SliderView;
import searchElem from '../../searchElem';

class SliderHandlers {

  private slider: HTMLElement;

  private lower!: HTMLElement;

  private upper!: HTMLElement;

  private initOptions: Init;
    
  constructor(slider: HTMLElement, initOptions: Init) {
    this.slider = slider;
    this.initOptions = initOptions;
    this.init();
  }

  private init(): void {
    this.searcElems();
  }

  private searcElems(): void {
    this.lower = searchElem('.slider__handle-lower', this.slider) as HTMLElement;
    this.upper = searchElem('.slider__handle-upper', this.slider) as HTMLElement;
  }

  private toggleHandlersOrder(handle: HTMLElement) {
    if (handle === this.lower && !this.lower.classList.contains('slider__handle-lower_z-index-up')) {
      this.lower.classList.add('slider__handle-lower_z-index-up');
      this.upper.classList.remove('slider__handle-upper_z-index-up');
    }
    if (handle === this.upper && !this.upper.classList.contains('slider__handle-upper_z-index-up')) {
      this.upper.classList.add('slider__handle-upper_z-index-up');
      this.lower.classList.remove('slider__handle-lower_z-index-up');
    }
  }

  private shiftLeftHandler(value: number) {
    if (this.initOptions.orientation === 'horizontal') {
      this.lower.style.left = value + '%';
    }
    if (this.initOptions.orientation === 'vertical') {
      this.lower.style.top = 100 - value + '%';
    }
  }

  private shiftRightHandler(value: number) {
    if (this.initOptions.orientation === 'horizontal') {
      this.upper.style.left = value + '%';
    }
    if (this.initOptions.orientation === 'vertical') {
      this.upper.style.top = 100 - value + '%';
    }
  }

  private convertToPercent(customValue: number) {
    const valuePercent = (100 / Math.abs(this.initOptions.max - this.initOptions.min)) * (-this.initOptions.min + customValue);
    return valuePercent;
  }

  public handlersUpdate() {
    let [min, max]: number[] = [this.initOptions.setMin, this.initOptions.setMax];
    if (min !== undefined) {
      this.toggleHandlersOrder(this.lower);
      min = parseFloat((min).toFixed(this.initOptions.max.toString().length));
      this.shiftLeftHandler(this.convertToPercent(min));
    }
    if (max !== undefined) {
      this.toggleHandlersOrder(this.upper);
      max = parseFloat((max).toFixed(this.initOptions.max.toString().length));
      this.shiftRightHandler(this.convertToPercent(max));
    }
  }

  private checkSliderOrientation() {
    if (this.initOptions.orientation === 'vertical') {
      return this.slider.getBoundingClientRect().height!;
    } else {
      return this.slider.getBoundingClientRect().width!;
    }
  }

  private convertToCustom(value: number) {
    const pow = this.initOptions.max.toString().length;
    return Math.round((value * ((Math.abs(this.initOptions.max - this.initOptions.min)) / this.checkSliderOrientation()) + this.initOptions.min) * Math.pow(10, pow)) / Math.pow(10, pow);
  }

  public getHandlersCoords(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    let getCoord = () => {

      if (e instanceof MouseEvent) {
        if (this.initOptions.orientation === 'vertical') {
          return e.clientY;
        } else {     
          return e.pageX;
        }
      }
      if (window.TouchEvent && e instanceof TouchEvent) {
        if (this.initOptions.orientation === 'vertical') {
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
    
    if (this.initOptions.orientation === 'vertical') {
      clientCoord = this.slider.getBoundingClientRect().height! - currentCoord + this.slider.getBoundingClientRect().top;
    }
    if (elem === this.lower) {  
      min = this.convertToCustom(clientCoord);
    } 
    if (elem === this.upper) {
      max = this.convertToCustom(clientCoord);
    }
    
    return [min, max];
  }

  public getHandlerElems() {
    return [this.lower, this.upper];
  }

  public checkOrientation() {
    
    if (this.initOptions.orientation === 'vertical') {
      this.upper.style.left = '';
      this.lower.style.left = '';
    }

    if (this.initOptions.orientation === 'horizontal') {
      this.upper.style.top = '';
      this.lower.style.top = '';
    }
  }

  public checkType() {
    if (this.initOptions.sliderType === 'single') {
      this.lower.classList.add('slider__handle-lower_hidden');
    } else {
      this.lower.classList.remove('slider__handle-lower_hidden');
    }
  }

  public updateObserver() {
    this.handlersUpdate();
  }
}

export default SliderHandlers;
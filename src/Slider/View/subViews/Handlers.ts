class SliderHandlers {

  private slider: HTMLElement;

  private lower!: HTMLElement;

  private upper!: HTMLElement;

  private initOptions: Init;
    
  constructor(slider: HTMLElement, initOptions: Init) {
    this.slider = slider;
    this.initOptions = { ...initOptions };
    this.init();
  }

  public updateObserver(state: Init): void {
    this.updateState(state);
    this.checkOrientation();
    this.handlersUpdate();
    this.checkType();
    this.toggleHandlersOrder();
  }

  public getHandlerElems(): HTMLElement[] {
    return [this.lower, this.upper];
  }

  public getHandlersCoords(elem: HTMLElement, e: MouseEvent | TouchEvent | KeyboardEvent): number[] {
    let currentCoord: number = 0;
    
    if (e instanceof MouseEvent) {

      if (this.initOptions.orientation === 'vertical') {
        currentCoord = e.clientY;
      } else {     
        currentCoord = e.clientX;
      }
    }

    if (window.TouchEvent && e instanceof TouchEvent) {
      
      if (this.initOptions.orientation === 'vertical') {
        currentCoord = e.touches[0].clientY;
      } else {
        currentCoord = e.touches[0].clientX;
      }
    }

    if (e instanceof KeyboardEvent) {
      const elemBounding =  (elem.getBoundingClientRect().height / 2);
      const stepInCoords = this.convertFromCustom(this.initOptions.step);

      if (e.key === 'ArrowLeft') {   

        if (this.initOptions.orientation === 'vertical') {
          currentCoord = elem.getBoundingClientRect().top + elemBounding + stepInCoords;
        } else {
          currentCoord = elem.getBoundingClientRect().left - stepInCoords;
        }
      }

      if (e.key === 'ArrowRight') {

        if (this.initOptions.orientation === 'vertical') {
          currentCoord = elem.getBoundingClientRect().top + elemBounding - stepInCoords;
        } else {
          currentCoord = elem.getBoundingClientRect().right + stepInCoords;
        }
      }
    }
    const sliderBounding = this.slider.getBoundingClientRect();
    let [min, max]: number[] = [];
    let clientCoord: number = currentCoord - sliderBounding.left;

    if (this.initOptions.orientation === 'vertical') {
      clientCoord = sliderBounding.height - currentCoord + sliderBounding.top;
    }

    if (elem === this.lower) {  
      min = this.convertToCustom(clientCoord);
    } 

    if (elem === this.upper) {
      max = this.convertToCustom(clientCoord);
    }
    
    return [min, max];
  }

  private handlersUpdate(): void{
    let [min, max]: number[] = [this.initOptions.valueFrom, this.initOptions.valueTo];
    this.shiftLeftHandler(this.convertToPercent(min));
    this.shiftRightHandler(this.convertToPercent(max));
  }

  private updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  private init(): void { 
    this.createElements();
    this.shiftLeftHandler(this.convertToPercent(this.initOptions.valueFrom));
    this.shiftRightHandler(this.convertToPercent(this.initOptions.valueTo));
    this.checkType();
  }

  private createElements(): void {
    const lower = document.createElement('div');
    lower.classList.add('slider__handle-lower');
    lower.setAttribute('tabindex', '-1');
    this.lower = lower;
    const upper = document.createElement('div');
    upper.classList.add('slider__handle-upper');
    upper.setAttribute('tabindex', '-1');
    this.upper = upper;
  }
  
  private toggleHandlersOrder(): void {
    if (document.activeElement === this.lower && !this.lower.classList.contains('slider__handle-lower_z-index-up')) {
      this.lower.classList.add('slider__handle-lower_z-index-up');
      this.upper.classList.remove('slider__handle-upper_z-index-up');
    }

    if (document.activeElement === this.upper && !this.upper.classList.contains('slider__handle-upper_z-index-up')) {
      this.upper.classList.add('slider__handle-upper_z-index-up');
      this.lower.classList.remove('slider__handle-lower_z-index-up');
    }
  }

  private shiftLeftHandler(value: number): void {
    if (this.initOptions.orientation === 'horizontal') {
      this.lower.style.left = value + '%';
    }

    if (this.initOptions.orientation === 'vertical') {
      this.lower.style.top = 100 - value + '%';
    }
  }

  private shiftRightHandler(value: number): void {
    if (this.initOptions.orientation === 'horizontal') {
      this.upper.style.left = value + '%';
    }

    if (this.initOptions.orientation === 'vertical') {
      this.upper.style.top = 100 - value + '%';
    }
  }

  private convertToPercent(customValue: number): number {
    const valuePercent = (100 / Math.abs(this.initOptions.max - this.initOptions.min)) * (-this.initOptions.min + customValue);
    return valuePercent;
  }

  private checkSliderOrientation(): number {
    if (this.initOptions.orientation === 'vertical') {
      return this.slider.getBoundingClientRect().height;
    } else {
      return this.slider.getBoundingClientRect().width;
    }
  }

  private convertToCustom(value: number): number {
    return value * ((Math.abs(this.initOptions.max - this.initOptions.min)) / this.checkSliderOrientation()) + this.initOptions.min;
  }

  private convertFromCustom(value: number): number {
    return (this.checkSliderOrientation() / ((Math.abs(this.initOptions.max - this.initOptions.min)))) * (value);
  }

  private checkOrientation(): void {
    if (this.initOptions.orientation === 'vertical') {
      this.upper.style.left = '';
      this.lower.style.left = '';
    }

    if (this.initOptions.orientation === 'horizontal') {
      this.upper.style.top = '';
      this.lower.style.top = '';
    }
  }

  private checkType(): void {
    if (this.initOptions.type === 'single') this.lower.classList.add('slider__handle-lower_hidden');

    if (this.initOptions.type === 'range') this.lower.classList.remove('slider__handle-lower_hidden');
  }
}

export default SliderHandlers;
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
  }

  public getHandlerElems(): HTMLElement[] {
    return [this.lower, this.upper];
  }

  public handlersUpdate(): void{
    
    let [min, max]: number[] = [this.initOptions.valueFrom, this.initOptions.valueTo];

    if (min !== undefined) {
      this.toggleHandlersOrder(this.lower);
      this.shiftLeftHandler(this.convertToPercent(min));
    }

    if (max !== undefined) {
      this.toggleHandlersOrder(this.upper);
      this.shiftRightHandler(this.convertToPercent(max));
    }
  }

  public getHandlersCoords(elem: HTMLElement, e: MouseEvent | TouchEvent): number[] {
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

  private updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  private init(): void { 
    this.createElements();
    this.handlersUpdate();
    this.checkType();
  }

  private createElements(): void {
    const lower = document.createElement('div');
    lower.classList.add('slider__handle-lower');
    this.lower = lower;
    const upper = document.createElement('div');
    upper.classList.add('slider__handle-upper');
    this.upper = upper;
  }

  private toggleHandlersOrder(handle: HTMLElement): void {
    if (handle === this.lower && !this.lower.classList.contains('slider__handle-lower_z-index-up')) {
      this.lower.classList.add('slider__handle-lower_z-index-up');
      this.upper.classList.remove('slider__handle-upper_z-index-up');
    }

    if (handle === this.upper && !this.upper.classList.contains('slider__handle-upper_z-index-up')) {
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
    const pow = this.initOptions.max.toString().length;
    return Math.round((value * ((Math.abs(this.initOptions.max - this.initOptions.min)) / this.checkSliderOrientation()) + this.initOptions.min) * Math.pow(10, pow)) / Math.pow(10, pow);
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

  private checkType(): void{
    if (this.initOptions.type === 'single') this.lower.classList.add('slider__handle-lower_hidden');

    if (this.initOptions.type === 'range') this.lower.classList.remove('slider__handle-lower_hidden');
  }
}

export default SliderHandlers;
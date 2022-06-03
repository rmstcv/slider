import searchElem from '../../searchElem';

class SliderHandlers {

  private slider: HTMLElement;

  private lower!: HTMLElement;

  private upper!: HTMLElement;

  private state: Init;
    
  constructor(slider: HTMLElement, initOptions: Init) {
    this.slider = slider;
    this.state = { ...initOptions };
    this.init();
  }

  public updateObserver(state: Init): void {
    this.updateState(state);
    this.handlersUpdate();
    this.checkType();
    this.checkOrientation();
  }

  public getHandlerElems(): HTMLElement[] {
    return [this.lower, this.upper];
  }

  public handlersUpdate(): void{
    
    let [min, max]: number[] = [this.state.valueFrom, this.state.valueTo];

    if (min !== undefined) {
      this.toggleHandlersOrder(this.lower);
      min = parseFloat((min).toFixed(this.state.max.toString().length));
      this.shiftLeftHandler(this.convertToPercent(min));
    }

    if (max !== undefined) {
      this.toggleHandlersOrder(this.upper);
      max = parseFloat((max).toFixed(this.state.max.toString().length));
      this.shiftRightHandler(this.convertToPercent(max));
    }
  }

  public getHandlersCoords(elem: HTMLElement, e: MouseEvent | TouchEvent): number[] {
    let getCoord = () => {
      if (e instanceof MouseEvent) {

        if (this.state.orientation === 'vertical') {
          return e.clientY;
        } else {     
          return e.pageX;
        }
      }

      if (window.TouchEvent && e instanceof TouchEvent) {

        if (this.state.orientation === 'vertical') {
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

    if (this.state.orientation === 'vertical') {
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
    this.state = { ...state };
  }

  private init(): void { 
    this.searcElems();
    this.handlersUpdate();
  }

  private searcElems(): void {
    this.lower = searchElem('.slider__handle-lower', this.slider) as HTMLElement;
    this.upper = searchElem('.slider__handle-upper', this.slider) as HTMLElement;
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
    if (this.state.orientation === 'horizontal') {
      this.lower.style.left = value + '%';
    }

    if (this.state.orientation === 'vertical') {
      this.lower.style.top = 100 - value + '%';
    }
  }

  private shiftRightHandler(value: number): void {
    if (this.state.orientation === 'horizontal') {
      this.upper.style.left = value + '%';
    }

    if (this.state.orientation === 'vertical') {
      this.upper.style.top = 100 - value + '%';
    }
  }

  private convertToPercent(customValue: number): number {
    const valuePercent = (100 / Math.abs(this.state.max - this.state.min)) * (-this.state.min + customValue);
    return valuePercent;
  }

  private checkSliderOrientation(): number {
    if (this.state.orientation === 'vertical') {
      return this.slider.getBoundingClientRect().height;
    } else {
      return this.slider.getBoundingClientRect().width;
    }
  }

  private convertToCustom(value: number): number {
    const pow = this.state.max.toString().length;
    return Math.round((value * ((Math.abs(this.state.max - this.state.min)) / this.checkSliderOrientation()) + this.state.min) * Math.pow(10, pow)) / Math.pow(10, pow);
  }

  private checkOrientation(): void {
    if (this.state.orientation === 'vertical') {
      this.upper.style.left = '';
      this.lower.style.left = '';
    }

    if (this.state.orientation === 'horizontal') {
      this.upper.style.top = '';
      this.lower.style.top = '';
    }
  }

  private checkType(): void{
    if (this.state.type === 'single') this.lower.classList.add('slider__handle-lower_hidden');

    if (this.state.type === 'range') this.lower.classList.remove('slider__handle-lower_hidden');
  }
}

export default SliderHandlers;
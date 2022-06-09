class ToolTip {
  private lowerCount!: HTMLElement;

  private upperCount!: HTMLElement;

  private initOptions: Init;
    
  constructor(initOptions: Init) {
    this.initOptions = { ...initOptions };
    this.init();
  }

  public updateObserver(state: Init): void {
    this.updateState(state);
    this.update([this.initOptions.valueFrom, this.initOptions.valueTo]);
    this.toggletoolTip();
  }

  public updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  public getElems(): HTMLElement[] {
    return [this.lowerCount, this.upperCount];
  }

  private init(): void {
    this.createElements();
    const { valueFrom, valueTo } = this.initOptions;
    this.update([valueFrom, valueTo]); 
    this.toggletoolTip();
  }

  private createElements(): void {
    const lowerCount = document.createElement('div');
    lowerCount.classList.add('slider__handle-lower-count');
    this.lowerCount = lowerCount;
    const upperCount = document.createElement('div');
    upperCount.classList.add('slider__handle-lower-count');
    this.upperCount = upperCount;
  }

  private toggletoolTip(): void {
    const { toolTip } = this.initOptions;
    if (!toolTip) {
      this.lowerCount.classList.add('slider__handle-upper-count_hidden');
      this.upperCount.classList.add('slider__handle-upper-count_hidden');
    } else {
      this.lowerCount.classList.remove('slider__handle-upper-count_hidden');
      this.upperCount.classList.remove('slider__handle-upper-count_hidden');
    }
  }

  private update([min, max]: number[]): void { 

    if (min !== undefined) {
      this.lowerCount.innerHTML = min.toString();
    }

    if (max !== undefined) {
      this.upperCount.innerHTML = max.toString();
    }
    
    if (this.upperCount.innerHTML === this.lowerCount.innerHTML) {
      this.lowerCount.classList.add('slider__handle-lower-count_hidden');
    } else {
      this.lowerCount.classList.remove('slider__handle-lower-count_hidden');
    }
  }
}

export default ToolTip;
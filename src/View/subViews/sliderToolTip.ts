import searchElem from '../../searchElem';

class ToolTip {

  private slider: HTMLElement;

  private lowerCount!: HTMLElement;

  private upperCount!: HTMLElement;

  private initToolTip: Init;
    
  constructor(slider: HTMLElement, initToolTip: Init) {
    this.slider = slider;
    this.initToolTip = { ...initToolTip };
    this.init();
  }

  public updateObserver(state: Init): void {
    this.updateState(state);
    this.update([this.initToolTip.valueFrom, this.initToolTip.valueTo]);
    this.toggletoolTip();
  }

  public updateState(state: Init): void {
    this.initToolTip = { ...state };
  }

  private init(): void {
    this.searcElems();
    const { valueFrom, valueTo } = this.initToolTip;
    this.update([valueFrom, valueTo]); 
    this.toggletoolTip();
  }

  private searcElems(): void {
    this.lowerCount = searchElem('.slider__handle-lower-count', this.slider) as HTMLElement;
    this.upperCount = searchElem('.slider__handle-upper-count', this.slider) as HTMLElement;
  }

  private toggletoolTip(): void {
    const { toolTip } = this.initToolTip;
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
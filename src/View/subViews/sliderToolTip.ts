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

  private init(): void {
    this.searcElems();
    const { setMin, setMax } = this.initToolTip;
    this.update([setMin, setMax]); 
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
    }
  }

  public update([min, max]: number[]): void { 
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

  public setToolTip(): void {
    this.lowerCount.classList.toggle('slider__handle-upper-count_hidden');
    this.upperCount.classList.toggle('slider__handle-lower-count_hidden');
  }

  public updateObserver() {
    this.update([this.initToolTip.setMin, this.initToolTip.setMax]);
  }

  updateState(state: Init){
    this.initToolTip = { ...state };
  }
}

export default ToolTip;
import searchElem from '../../searchElem';

class ProgressBar {

  private slider: HTMLElement;

  private progressBar!: HTMLElement;

  private initOptions: Init;
    
  constructor(slider: HTMLElement, initOptions: Init) {
    this.slider = slider;
    this.initOptions = initOptions;
    this.init();
  }

  init() {
    this.searchElems();
    this.progressBarUpdate();
  }

  private searchElems(): void {
    this.progressBar = searchElem('.slider__highlight', this.slider) as HTMLElement;
  }

  private progressBarUpdate(): void {
    this.checkOrientation();
    const [min, max]: number[] = [this.initOptions.setMin, this.initOptions.setMax];
    const [minPercent, maxPercent] = [this.convertToPercent(min), this.convertToPercent(max)];
    const progressLength = maxPercent - minPercent; 

    if (this.initOptions.orientation === 'horizontal') {

      if ( progressLength >= 0 ) {
        this.progressBar.style.width = progressLength + '%';
        this.progressBar.style.left = minPercent + '%';
      }
    }

    if (this.initOptions.orientation === 'vertical') {

      if ( progressLength >= 0 ) {
        this.progressBar.style.height = progressLength + '%';
        this.progressBar.style.top = 100 - maxPercent + '%';
      }
    }
  } 

  private convertToPercent(customValue: number) {
    const valuePercent = (100 / Math.abs(this.initOptions.max - this.initOptions.min)) * (-this.initOptions.min + customValue);
    return valuePercent;
  }

  private checkOrientation() {
    if (this.initOptions.orientation === 'vertical') {
      this.progressBar.style.width = '';
      this.progressBar.style.left = '';
    } else {
      this.progressBar.style.height = '';
      this.progressBar.style.top = '';
    }
  }

  public updateObserver() {
    this.progressBarUpdate();
  }
}

export default ProgressBar;
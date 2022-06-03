import searchElem from '../../searchElem';

class ProgressBar {

  private slider: HTMLElement;

  private progressBar!: HTMLElement;

  private initOptions: Init;
    
  constructor(slider: HTMLElement, initOptions: Init) {
    this.slider = slider;
    this.initOptions = { ...initOptions };
    this.init();
  }

  public updateObserver(state: Init): void {
    this.updateState(state);
    this.progressBarUpdate();
  }

  private updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  private init(): void {
    this.searchElems();
    this.progressBarUpdate();
  }

  private searchElems(): void {
    this.progressBar = searchElem('.slider__highlight', this.slider) as HTMLElement;
  }

  private progressBarUpdate(): void {
    this.checkOrientation();
    const [min, max] = [this.initOptions.setMin, this.initOptions.setMax];
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

  private convertToPercent(customValue: number): number {
    const { max, min } = this.initOptions;
    const valuePercent = (100 / Math.abs(max - min)) * (-min + customValue);
    return valuePercent;
  }

  private checkOrientation(): void {
    if (this.initOptions.orientation === 'vertical') {
      this.progressBar.style.width = '';
      this.progressBar.style.left = '';
    } else {
      this.progressBar.style.height = '';
      this.progressBar.style.top = '';
    }
  }
}

export default ProgressBar;
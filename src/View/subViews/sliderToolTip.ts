import searchElem from '../../searchElem';

class ToolTip {

  slider: HTMLElement;

  lowerCount: HTMLElement;

  upperCount: HTMLElement;

  initToolTip: Init;
    
  constructor(slider: HTMLElement, initToolTip: Init) {
    this.slider = slider;
    this.initToolTip = initToolTip;
    this.lowerCount = searchElem('.slider__handle-lower-count', this.slider) as HTMLElement;
    this.upperCount = searchElem('.slider__handle-upper-count', this.slider) as HTMLElement;
    this.init();
  }

  init() {
    const { setMin, setMax, toolTip } = this.initToolTip;
    this.update([setMin, setMax]);
    if (!toolTip) {
      this.lowerCount.classList.add('slider__handle-upper-count_hidden');
      this.upperCount.classList.add('slider__handle-upper-count_hidden');
    }
  }

  update([min, max]: number[]) { 
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

  setToolTip() {
    this.lowerCount.classList.toggle('slider__handle-upper-count_hidden');
    this.upperCount.classList.toggle('slider__handle-lower-count_hidden');
  }
}

export default ToolTip;
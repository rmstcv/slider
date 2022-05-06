import searchElem from './searchElem';

class ToolTip {

  slider: HTMLElement;

  lowerCount: HTMLElement;

  upperCount: HTMLElement;
    
  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.lowerCount = searchElem('.slider__handle-lower-count', this.slider) as HTMLElement;
    this.upperCount = searchElem('.slider__handle-upper-count', this.slider) as HTMLElement;
  }

  update([min, max]: number[]) { 
    if (min !== undefined) {
      this.lowerCount.innerHTML = min.toString();
    }
    if (max !== undefined) {
      this.upperCount.innerHTML = max.toString();
    }
    if (min === max) {
      this.lowerCount.style.opacity = '0';
    } else {
      this.lowerCount.style.opacity = '1';
    }
  }

  setToolTip() {
    if (this.lowerCount.style.display === 'none' && this.upperCount.style.display === 'none') {
      this.lowerCount.style.display = 'block';
      this.upperCount.style.display = 'block';
    } else {
      this.lowerCount.style.display = 'none';
      this.upperCount.style.display = 'none';
    }
  }
}

export default ToolTip;
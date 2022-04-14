class ToCustomValue {

  slider: HTMLElement;

  customLength: number;

  orientation?: 'vertical' | 'horizontal';

  constructor(slider: HTMLElement, customLength: number, orientation?: 'vertical' | 'horizontal') {
    this.slider = slider;
    this.customLength = customLength;
    this.orientation = orientation;
  }

  convertToCustom(value: number) {
    if (this.orientation === 'vertical') {
      return Math.round((value * this.customLength / this.slider.getBoundingClientRect().height) * Math.pow(10, 2)) / Math.pow(10, 2);
    } else {
      return Math.round((value * this.customLength / this.slider.getBoundingClientRect().width) * Math.pow(10, 2)) / Math.pow(10, 2);
    }
   
  }

  convertFromCustom(value: number) {
    if (this.orientation === 'vertical') {
      return value / (this.customLength / this.slider.getBoundingClientRect().height);
    } else {
      return value / (this.customLength / this.slider.getBoundingClientRect().width);
    }
  }

  getValuesCustom(valuesInit: number[]) {
    const [min, max] = valuesInit;
    const customMin = this.convertToCustom(min);
    const customMax = this.convertToCustom(max);
    return [customMin, customMax];
  }
}

export default ToCustomValue;
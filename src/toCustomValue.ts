class ToCustomValue {

  sliderLength: number;

  customLength: number;

  constructor(sliderLength: number, customLength: number) {
    this.sliderLength = sliderLength;
    this.customLength = customLength;
  }

  convertToCustom(value: number) {
    return Math.round((value * this.customLength / this.sliderLength) * Math.pow(10, 2)) / Math.pow(10, 2);
  }

  convertFromCustom(value: number) {
    return value / (this.customLength / this.sliderLength);
  }

  getValuesCustom(valuesInit: number[]) {
    const [min, max] = valuesInit;
    const customMin = this.convertToCustom(min);
    const customMax = this.convertToCustom(max);
    return [customMin, customMax];
  }
}

export default ToCustomValue;
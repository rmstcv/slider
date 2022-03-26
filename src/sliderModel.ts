interface Init {
  sliderLength: number;
  minCoordCustom: number;
  maxCoordCustom: number; 
  step: number
}

class SliderModel {

  sliderMin: number;

  sliderMax: number;

  sliderLength: number;

  customMin: number;

  customMax: number;

  currentLow: number;

  currentUpper: number;

  step: number;

  constructor(init: Init) {
    this.sliderLength = init.sliderLength;
    this.customMin = init.minCoordCustom;
    this.customMax = init.maxCoordCustom;
    this.step = init.step;
    this.sliderMin = 0;
    this.sliderMax = init.sliderLength;
    this.currentLow = this.sliderMin;
    this.currentUpper = this.sliderMax;
  }

  toCustomValue(coord: number) {
    const lengthCustom = this.customMax - this.customMin;
    const multiplier = lengthCustom / this.sliderMax - this.sliderMax;
    const value = Math.round(coord * multiplier);
    return value;
  }

  checkExtremumCoords(coordCurrent: number, min: number, max: number) {
    let coordChecked = coordCurrent;
    
    if (coordCurrent < min) {
      coordChecked = min;
    }
    if (coordChecked > max) {
      coordChecked = max;
    }    
    return coordChecked;
  }

  checkDirection(currentCoord: number, cursorCoord: number) {
    let  direction: 1 | -1 = 1;

    if (currentCoord <= cursorCoord) {
      direction = 1;
    }
    if (currentCoord > cursorCoord) {
      direction = -1;
    }
    return direction;
  }

  getNextValue(currentCoord: number, min: number, max: number, currentCursor: number) {
    const direction = this.checkDirection(currentCoord, currentCursor);
    const increase = this.step * direction;
    const nextValue = this.checkExtremumCoords(currentCoord + increase, min, max);
    
    return nextValue;
  }

  setCurrentValue(currentValue: number, cursorCoord: number, nextValue: number) {
    let newCurrentValue: number = currentValue;

    if (cursorCoord > nextValue && nextValue > currentValue) {
      newCurrentValue = nextValue;
    }
    if (cursorCoord < currentValue && cursorCoord < nextValue) {
      newCurrentValue = nextValue;
    }
    return newCurrentValue;
  }

  setMin(cursorCoordLow: number) {
    const nextValue = this.getNextValue(this.currentLow, this.sliderMin, this.currentUpper, cursorCoordLow);
    this.currentLow = this.setCurrentValue(this.currentLow, cursorCoordLow, nextValue);
    return this.currentLow;
  }

  setMax(cursorCoordUpper: number) {
    const nextValue = this.getNextValue(this.currentUpper, this.currentLow, this.sliderMax, cursorCoordUpper);
    this.currentUpper = this.setCurrentValue(this.currentUpper, cursorCoordUpper, nextValue);
    return this.currentUpper;
  }

  getMinMax() {
    return [this.currentLow, this.currentUpper];
  }
}

export default SliderModel;
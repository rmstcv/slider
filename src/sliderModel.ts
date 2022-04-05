interface InitModel {
  minCoordCustom: number;
  maxCoordCustom: number; 
  step: number
}

class SliderModel {

  sliderMin: number;

  sliderMax: number;

  customMin: number;

  customMax: number;

  currentLow: number;

  currentUpper: number;

  step: number;

  constructor(init: InitModel) {
    this.customMin = init.minCoordCustom;
    this.customMax = init.maxCoordCustom;
    this.step = init.step;
    this.sliderMin = init.minCoordCustom;
    this.sliderMax = init.maxCoordCustom;
    this.currentLow = this.sliderMin;
    this.currentUpper = this.sliderMax;
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
    const increase = (this.step) * direction;
    const nextValue = this.checkExtremumCoords(currentCoord + increase, min, max);
    
    return nextValue;
  }

  setCurrentValue(currentValue: number, cursorCoord: number, nextValue: number) {
    let newCurrentValue: number = currentValue;
    const step = (this.step);
    if (cursorCoord > nextValue && nextValue > currentValue) {
      newCurrentValue = Math.round( cursorCoord / step) * step;
    }
    if (cursorCoord < currentValue && cursorCoord < nextValue) {
      newCurrentValue = Math.round( cursorCoord / step) * step;
    }
    return newCurrentValue;
  }

  setNextMin(cursorCoordLow: number) {
    const nextValue = this.getNextValue(this.currentLow, this.sliderMin, this.currentUpper, cursorCoordLow);
    const newCurrentValue = this.setCurrentValue(this.currentLow, cursorCoordLow, nextValue);
    this.currentLow = this.checkExtremumCoords(newCurrentValue, this.sliderMin, this.currentUpper);
    return this.currentLow;
  }

  setNextMax(cursorCoordUpper: number) {
    const nextValue = this.getNextValue(this.currentUpper, this.currentLow, this.sliderMax, cursorCoordUpper);
    const newCurrentValue = this.setCurrentValue(this.currentUpper, cursorCoordUpper, nextValue);
    this.currentUpper = this.checkExtremumCoords(newCurrentValue, this.currentLow, this.sliderMax);
    return this.currentUpper;
  }

  setMinMaxCustom(minCustom: number, maxCustom: number) {
    const [min, max] = [(minCustom), (maxCustom)];
    this.currentLow = min;
    this.currentUpper = max;    
    return [min, max];
  }

  getMinMax() {
    return [this.currentLow, this.currentUpper];
  }

  getMinMaxCustom() {
    return this.getMinMax();
  }
}

export default SliderModel;
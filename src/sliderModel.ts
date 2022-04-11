interface InitModel {
  sliderMin: number;
  sliderMax: number; 
  step: number
}

class SliderModel {

  sliderMin: number;

  sliderMax: number;

  currentLow: number;

  currentUpper: number;

  step: number;

  newPosition: number = 0;

  constructor(init: InitModel) {
    this.step = init.step;
    this.sliderMin = init.sliderMin;
    this.sliderMax = init.sliderMax;
    this.currentLow = this.sliderMin;
    this.currentUpper = this.sliderMax;
  }

  checkExtremumValues(current: number, min: number, max: number) {
    let currentChecked = current;
    
    if (current < min) {
      currentChecked = min;
      
    }
    if (current > max) {
      currentChecked = max;
    }    
    return currentChecked;
  }

  checkDirection(currentValue: number, nextValue: number) {
    let  direction: 1 | -1 = 1;

    if (currentValue <= nextValue) {
      direction = 1;
    }
    if (currentValue > nextValue) {
      direction = -1;
    }
    return direction;
  }

  findNextValue(currentValue: number, min: number, max: number) {
    const increment = this.step * this.checkDirection(currentValue, this.newPosition);
    const nextValue = this.checkExtremumValues(currentValue + increment, min, max);  
    let newCurrentValue = currentValue;

    if (this.newPosition >= nextValue && nextValue > currentValue) {
      newCurrentValue = Math.round(this.newPosition / this.step) * this.step;
    }
    if (this.newPosition < currentValue && this.newPosition <= nextValue) {
      newCurrentValue = Math.round(this.newPosition / this.step) * this.step;
    }
    newCurrentValue = this.checkExtremumValues(newCurrentValue, min, max); 
    return newCurrentValue;
  }

  setNewLowValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentLow, this.sliderMin, this.currentUpper);
    this.currentLow = nextValue;  
    return this.currentLow;
  }

  setNewUpValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentUpper, this.currentLow, this.sliderMax);
    this.currentUpper = nextValue;
    return this.currentUpper;
  }

  update([min, max]: number[]) {
    let [minNew, maxNew] = [min, max];
    if (min !== undefined) {
      minNew = this.setNewLowValue(min); 
    }
    if (max !== undefined) {
      maxNew = this.setNewUpValue(max);
    }
    return [minNew, maxNew];
  }
}

export default SliderModel;
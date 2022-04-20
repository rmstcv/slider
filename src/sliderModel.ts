interface InitModel {
  sliderMin: number;
  sliderMax: number; 
  step: number
}

class SliderModel {

  sliderMin: number;

  sliderMax: number;

  currentLow: number;

  currentUp: number;

  step: number;

  newPosition: number = 0;

  constructor(init: InitModel) {
    this.step = init.step;
    this.sliderMin = init.sliderMin;
    this.sliderMax = init.sliderMax;
    this.currentLow = this.sliderMin;
    this.currentUp = this.sliderMax;
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

  findNextValue(currentValue: number, min: number, max: number) { 
    let newCurrentValue = currentValue;
    let stepsIncr = Math.floor((this.newPosition - currentValue) / this.step);
    if (currentValue > this.newPosition) {
      stepsIncr = Math.ceil((this.newPosition - currentValue) / this.step);
    }
    newCurrentValue = currentValue + stepsIncr * this.step;
    newCurrentValue = this.checkExtremumValues(newCurrentValue, min, max);
    return newCurrentValue;
  }

  setNewLowValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentLow, this.sliderMin, this.currentUp);
    this.currentLow = nextValue;
    return this.currentLow;
  }

  setNewUpValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentUp, this.currentLow, this.sliderMax);
    this.currentUp = nextValue;
    return this.currentUp;
  }

  update([min, max]: number[]) {
    let [minNew, maxNew] = [min, max];
    if (min !== undefined) {
      minNew = this.setNewLowValue(min);
      minNew = parseFloat(minNew.toFixed(2));
    }
    if (max !== undefined) {
      maxNew = this.setNewUpValue(max);
      maxNew = parseFloat(maxNew.toFixed(2));
    }
    return [minNew, maxNew];
  }

  getValues() {
    return [this.currentLow, this.currentUp];
  }

  setValues([min, max]: number[]) {
    let [minNew, maxNew] = [min, max];
    if (min !== undefined) {
      this.currentLow = this.checkExtremumValues(min, this.sliderMin, this.currentUp);  
      minNew = this.currentLow;
    }
    if (max !== undefined) {
      this.currentUp = this.checkExtremumValues(max, this.currentLow, this.sliderMax);
      maxNew = this.currentUp;
    }
    return [minNew, maxNew];
  }

  setStep(step: number) {
    this.step = step;
  }

  init([min, max]: number[]) {
    this.setValues([min, max]);
  }
}

export default SliderModel;
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
    if (cursorCoord < this.sliderMin) {
      this.currentLow = this.sliderMin;
    }
    if (cursorCoord > this.currentUp) {
      this.currentLow = this.currentUp;
    }
    return this.currentLow;
  }

  setNewUpValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentUp, this.currentLow, this.sliderMax);
    this.currentUp = nextValue;
    if (cursorCoord > this.sliderMax) {
      this.currentUp = this.sliderMax;
    }
    if (cursorCoord < this.currentLow) {
      this.currentUp = this.currentLow;
    }
    return this.currentUp;
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
    const prevStep = this.step;
    if (step <= 0 || step > this.sliderMax - this.sliderMin) {
      this.step = prevStep;
    } else {
      this.step = step;
    }
    return this.step;
  }

  init([min, max]: number[]) {
    this.setValues([min, max]);
    return [this.currentLow, this.currentUp];
  }
}

export default SliderModel;
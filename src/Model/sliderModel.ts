class SliderModel {

  currentLow: number;

  currentUp: number;

  newPosition: number = 0;

  state: Init;

  initState: Init;

  constructor(init: Init) {
    this.currentLow = init.min;
    this.currentUp = init.max;
    this.initState = init;
    this.state = { ...init };
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
    let stepsIncr = Math.floor((this.newPosition - currentValue) / this.state.step);
    if (currentValue > this.newPosition) {
      stepsIncr = Math.ceil((this.newPosition - currentValue) / this.state.step);
    }
    newCurrentValue = currentValue + stepsIncr * this.state.step;
    newCurrentValue = this.checkExtremumValues(newCurrentValue, min, max);
    return newCurrentValue;
  }

  setNewLowValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentLow, this.state.min, this.currentUp);
    this.currentLow = nextValue;
    if (cursorCoord < this.state.min) {
      this.currentLow = this.state.min;
    }
    if (cursorCoord > this.currentUp) {
      this.currentLow = this.currentUp;
    }
    return this.currentLow;
  }

  setNewUpValue(cursorCoord: number) {
    this.newPosition = cursorCoord;
    const nextValue = this.findNextValue(this.currentUp, this.currentLow, this.state.max);
    this.currentUp = nextValue;
    if (cursorCoord > this.state.max) {
      this.currentUp = this.state.max;
    }
    if (cursorCoord < this.currentLow) {
      this.currentUp = this.currentLow;
    }
    return this.currentUp;
  }

  updateValues([min, max]: number[]) {
    
    let [minNew, maxNew] = [min, max];
    
    if (min !== undefined) {
      minNew = this.setNewLowValue(min);
    }
    if (max !== undefined) {
      maxNew = this.setNewUpValue(max);
    }
    this.updateState(minNew, maxNew);
    return [minNew, maxNew];
  }

  getValues() {
    return [this.state.setMin, this.state.setMax];
  }

  setValues([min, max]: number[]) {
    let [minNew, maxNew] = [min, max];
    if (min !== undefined) {
      this.currentLow = this.checkExtremumValues(min, this.state.min, this.currentUp);  
      minNew = this.currentLow;
    }
    if (max !== undefined) {
      this.currentUp = this.checkExtremumValues(max, this.currentLow, this.state.max);
      maxNew = this.currentUp;
    }
    this.updateState(minNew, maxNew);
    return [minNew, maxNew];
  }

  setValueFrom(min: number) {
    this.currentLow = this.checkExtremumValues(min, this.state.min, this.currentUp);
    this.state.setMin = this.currentLow;
  }

  setValueTo(max: number) {
    this.currentUp = this.checkExtremumValues(max, this.currentLow, this.state.max);
    this.state.setMax = this.currentUp;
  }

  setStep(step: number) {
    const prevStep = this.state.step;
    if (step <= 0 || step > this.state.max - this.state.min) {
      this.state.step = prevStep;
    } else {
      this.state.step = step;
    }
    return this.state.step;
  }

  init([min, max]: number[]) {
    this.setValues([min, max]);
  }

  updateState(min: number, max: number) {
    if (min !== undefined) this.state.setMin = min;
    if (max !== undefined) this.state.setMax = max;
  }

  getState(): Init{
    return this.state;
  }
}

export default SliderModel;
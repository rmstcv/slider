class SliderModel {

  readonly state: Init;

  constructor(init: Init) {
    this.state = { ...init };
  }

  public setState(param: Actions, value: Params) {

    if (param === 'type') {
      this.state.type = <Init['type']>value;
      this.state.valueFrom = this.state.min;
    }

    if (param === 'orientation') {
      this.state.orientation = <Init['orientation']>value;
    }

    if (param === 'scale') {
      this.state.scale = <boolean>value;
    }

    if (param === 'toolTip') {
      this.state.toolTip = <boolean>value;
    }

    if (param === 'step') {
      this.state.step = this.checkStep(<number>value);
    }

    if (param === 'valueTo') {
      this.state.valueTo = this.checkValueTo(<number>value);
    }

    if (param === 'valueFrom') {
      this.state.valueFrom = this.checkValueFrom(<number>value);
    }

    if (param === 'min') {
      this.state.min = this.checkMin(<number>value);
      if (this.state.type === 'single') this.state.valueFrom = this.state.min;
    }

    if (param === 'max') {
      this.state.max = this.checkMax(<number>value);
    }
  }

  public changeValues([min, max]: number[]): void {
    let [minNew, maxNew] = [min, max];
    
    if (min !== undefined) {
      minNew = this.findNextValue(this.state.valueFrom, min);
      this.setState('valueFrom', minNew);
    }
    if (max !== undefined) {
      maxNew = this.findNextValue(this.state.valueTo, max);
      this.setState('valueTo', maxNew);
    }
  }

  public getState(): Init{
    return this.state;
  }

  private checkExtremumValues(current: number, min: number, max: number): number {
    let currentValue = current;
    
    if (current < min) {
      currentValue = min;
    }

    if (current > max) {
      currentValue = max;
    }    
    return currentValue;
  }

  private findNextValue(currentValue: number, cursorCoord: number): number {    
    let newCurrentValue = currentValue;
    let stepIncr = Math.floor((cursorCoord - currentValue) / this.state.step);

    if (currentValue > cursorCoord) {
      stepIncr = Math.ceil((cursorCoord - currentValue) / this.state.step);
    }
    newCurrentValue = currentValue + stepIncr * this.state.step;
    newCurrentValue = parseFloat((newCurrentValue).toFixed(this.state.max.toString().length));
    return newCurrentValue;
  }

  private checkValueFrom(min: number): number {
    let newMin = this.checkExtremumValues(min, this.state.min, this.state.valueTo);
    newMin = parseFloat((newMin).toFixed(this.state.max.toString().length));
    return newMin;
  }

  private checkValueTo(max: number): number {
    let newMax = this.checkExtremumValues(max, this.state.valueFrom, this.state.max);
    newMax = parseFloat((newMax).toFixed(this.state.max.toString().length));
    return newMax;
  }

  private checkMin(min: number): number {
    let newMin = this.checkExtremumValues(min, -1e10, this.state.valueFrom);
    if (this.state.type === 'single')  newMin = this.checkExtremumValues(min, -1e10, this.state.valueTo);
    newMin = +newMin.toFixed(5);
    return newMin;
  }

  private checkMax(max: number): number {
    let newMax = this.checkExtremumValues(max, this.state.valueTo, 1e10);
    newMax = +newMax.toFixed(5);
    return newMax;
  }

  private checkStep(step: number): number {
    let newStep = this.state.step;
    
    if (step > 0 && step <= this.state.max - this.state.min) {
      newStep = parseFloat((step).toFixed(this.state.max.toString().length));
    }
    return newStep;
  }
}

export default SliderModel;
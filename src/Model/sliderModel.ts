class SliderModel {

  state: Init;

  constructor(init: Init) {
    this.state = { ...init };
  }

  public setState(param: Actions, value: Params) {

    if (param === 'type') {
      this.state.sliderType = <Init['sliderType']>value;
      this.state.setMin = this.state.min;
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
      this.state.setMax = this.checkValueTo(<number>value);
    }

    if (param === 'valueFrom' ) {
      this.state.setMin = this.checkValueFrom(<number>value);
    }
  }

  public changeValues([min, max]: number[]): void {
    let [minNew, maxNew] = [min, max];
    
    if (min !== undefined) {
      minNew = this.findNextValue(this.state.setMin, min);
      this.setState('valueFrom', minNew);
    }
    if (max !== undefined) {
      maxNew = this.findNextValue(this.state.setMax, max);
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
    return newCurrentValue;
  }

  private checkValueFrom(min: number): number {
    return this.checkExtremumValues(min, this.state.min, this.state.setMax);
  }

  private checkValueTo(max: number): number {
    return this.checkExtremumValues(max, this.state.setMin, this.state.max);
  }

  private checkStep(step: number): number {
    let newStep = this.state.step;
    
    if (step > 0 && step <= this.state.max - this.state.min) newStep = step;
    return newStep;
  }
}

export default SliderModel;
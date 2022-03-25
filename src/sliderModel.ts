interface Init {
  sliderLength: number;
  minCoordCustom: number;
  maxCoordCustom: number; 
  step: number
}

class SliderLogic {

  sliderMin: number = 0;

  sliderMax: number = 400;

  sliderLength: number;

  customMin: number;

  customMax: number;

  currentLow: number = this.sliderMin;

  currentUpper: number = this.sliderMax;

  direction: 1 | -1 = 1;

  cursorCoordLow: number;

  cursorCoordUpper: number;

  step: number;

  constructor(init: Init) {
    this.sliderLength = init.sliderLength;
    this.customMin = init.minCoordCustom;
    this.customMax = init.maxCoordCustom;
    this.step = init.step;
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

  setMin() {
    const minChecked = this.checkExtremumCoords(this.currentLow + this.step * this.direction, this.sliderMin, this.currentUpper);
    
    if (this.cursorCoordLow > this.currentLow + this.step * this.direction && this.direction === 1) {
      this.currentLow = minChecked;
    }
    if (this.cursorCoordLow < this.currentLow + this.step * this.direction && this.direction === -1) {
      this.currentLow = minChecked;
    }
    return this.currentLow;
  }

  setMax() {
    const maxChecked = this.checkExtremumCoords(this.currentUpper + this.step * this.direction, this.currentLow, this.sliderMax);
    if (this.cursorCoordUpper > this.currentUpper + this.step * this.direction && this.direction === 1) {
      this.currentUpper = maxChecked;
    }
    if (this.cursorCoordUpper < this.currentUpper + this.step * this.direction && this.direction === -1) {
      this.currentUpper = maxChecked;
    }
    return this.currentUpper;
  }
}

export default SliderLogic;
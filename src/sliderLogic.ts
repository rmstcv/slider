class SliderLogic {

  sliderMin: number = 0;

  sliderMax: number = 400;

  sliderLength: number;

  customMin: number;

  customMax: number;

  _currentMin: number = this.sliderMin;

  _currentMax: number = this.sliderMax;

  direction: 1 | -1;

  currentCoordMin: number;

  currentCoordMax: number;

  step: number = 100;

  constructor(init: { sliderLength: number; minCoordCustom: number; maxCoordCustom: number; }) {
    this.sliderLength = init.sliderLength;
    this.customMin = init.minCoordCustom;
    this.customMax = init.maxCoordCustom;
  }

  toCustomValue(coord: number) {
    const lengthCustom = this.customMax - this.customMin;
    const multiplier = lengthCustom / this.sliderLength;
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
    const minChecked = this.checkExtremumCoords(this._currentMin + this.step * this.direction, this.sliderMin, this._currentMax);
    if (this.currentCoordMin > this._currentMin + this.step * this.direction && this.direction === 1) {
      this._currentMin = minChecked;
    }
    if (this.currentCoordMin < this._currentMin + this.step * this.direction && this.direction === -1) {
      this._currentMin = minChecked;
    }
    return this._currentMin;
  }

  setMax() {
    const maxChecked = this.checkExtremumCoords(this._currentMax + this.step * this.direction, this._currentMin, this.sliderMax);
    if (this.currentCoordMax > this._currentMax + this.step * this.direction && this.direction === 1) {
      this._currentMax = maxChecked;
    }
    if (this.currentCoordMax < this._currentMax + this.step * this.direction && this.direction === -1) {
      this._currentMax = maxChecked;
    }
    return this._currentMax;
  }
}

export default SliderLogic;

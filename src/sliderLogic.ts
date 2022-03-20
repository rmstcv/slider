class SliderLogic {

  sliderLength: number;

  customMin: number;

  customMax: number;

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
}

export default SliderLogic;

class SliderLogic {

  min: number;

  max: number;

  customMin: number;

  customMax: number;

  constructor(init: { minCoord: number; maxCoord: number; minCoordCustom: number; maxCoordCustom: number; }) {
    this.min = init.minCoord;
    this.max = init.maxCoord;
    this.customMin = init.minCoordCustom;
    this.customMax = init.maxCoordCustom;
  }

  toCustomValue(coord: number) {
    const total = this.max - this.min;
    const totalCustom = this.customMax - this.customMin;
    const multiplier = totalCustom / total;
    const value = Math.round(coord * multiplier);
    return value;
  }

  checkExtremumCoords(coordCurrent: number) {
    let coordChecked = coordCurrent;
    
    if (coordCurrent < this.min) {
      coordChecked = this.min;
    }
    if (coordChecked > this.max) {
      coordChecked = this.max;
    }    
    return coordChecked;
  }
}

export default SliderLogic;

class SliderLogic {

  coord: number;

  min: number;

  max: number;

  customMin: number;

  customMax: number;

  minShift: number;

  maxShift: number;

  constructor() {
    this.coord = 0;
    this.minShift = 0;
    this.maxShift = 80;
    this.min = 0;
    this.max = 80;
    this.customMin = 0;
    this.customMax = 100;
  }

  set setActualCoord(coord: number) {
    this.coord = coord;
  }

  get getActualCoord() {
    return this.coord;
  }

  toCustomValue(coord: number) {
    const total = this.max - this.min;
    const totalCustom = this.customMax - this.customMin;
    const multiplier = totalCustom / total;
    const value = Math.round(coord * multiplier);
    return value;
  }
  
  checkExtremumCoords(coordMin: number, coordMax: number) {
    let coordChecked = this.getActualCoord;
    if (coordChecked <= coordMin) {
      coordChecked = coordMin;
    }
    if (coordChecked >= coordMax) {
      coordChecked = coordMax;
    }
    this.setActualCoord = coordChecked;
    this.maxShift = coordMax;
    this.minShift = coordMin;
    return coordChecked;
  }
}

export default SliderLogic;

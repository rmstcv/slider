class SliderLogic {

  coord: number;

  min: number;

  max: number;

  constructor() {
    this.coord = 0;
    this.min = 0;
    this.max = 80;
  }

  set setActualCoord(coord: number) {
    this.coord = coord;
  }

  get getActualCoord() {
    return this.coord;
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
    this.max = coordMax;
    this.min = coordMin;
    return coordChecked;
  }
}

export default SliderLogic;

import SliderLogic from '../src/sliderLogic';

const sliderLogic = new SliderLogic();

describe('slider values', () => {
  const valueReal = 30;
  it('custom coords', () => {
    expect(sliderLogic.toCustomValue(valueReal)).toEqual(38);
  });
});

describe('check extremum values', () => {
  const coordMin: number = 50;
  const coordMax: number = 200;
  it('check < min', () => {
    sliderLogic.setActualCoord = 10;
    expect(sliderLogic.getActualCoord).toEqual(10);
    expect(sliderLogic.checkExtremumCoords(coordMin, coordMax)).toEqual(50);
  });
  it('check > max', () => {
    sliderLogic.setActualCoord = 300;
    expect(sliderLogic.getActualCoord).toEqual(300);
    expect(sliderLogic.checkExtremumCoords(coordMin, coordMax)).toEqual(200);
  });
  it('check normal value', () => {
    sliderLogic.setActualCoord = 150;
    expect(sliderLogic.getActualCoord).toEqual(150);
    expect(sliderLogic.checkExtremumCoords(coordMin, coordMax)).toEqual(150);
  });
});

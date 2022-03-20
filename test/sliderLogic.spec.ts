import SliderLogic from '../src/sliderLogic';

const init = {
  sliderLength: 200,
  minCoordCustom: 0,
  maxCoordCustom: 100,
};

const sliderLogic = new SliderLogic(init);

describe('slider values', () => {
  const valueReal = Math.round(init.sliderLength / 2);
  it('custom coords', () => {
    expect(sliderLogic.toCustomValue(valueReal)).toEqual(valueReal * ((init.maxCoordCustom - init.minCoordCustom) / init.sliderLength));
  });
});

describe('check extremum values', () => {
  const validCoord = Math.round(init.sliderLength / 2);
  const minCoord = 0;
  const maxCoord = 100;

  it('check < min', () => {
    expect(sliderLogic.checkExtremumCoords(validCoord, minCoord, maxCoord)).toEqual(validCoord);
  });
  it('check > max', () => {
    expect(sliderLogic.checkExtremumCoords(minCoord - 10, minCoord, maxCoord)).toEqual(0);
  });
  it('check normal value', () => {
    expect(sliderLogic.checkExtremumCoords(maxCoord + 10, minCoord, maxCoord)).toEqual(maxCoord);
  });
});

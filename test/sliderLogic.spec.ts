import SliderLogic from '../src/sliderLogic';

const init = {
  minCoord: 0,
  maxCoord: 200,
  minCoordCustom: 0,
  maxCoordCustom: 100,
};

const sliderLogic = new SliderLogic(init);

describe('slider values', () => {
  const valueReal = Math.round((init.maxCoord - init.minCoord) / 2);
  it('custom coords', () => {
    expect(sliderLogic.toCustomValue(valueReal)).toEqual(valueReal * ((init.maxCoordCustom - init.minCoordCustom) / (init.maxCoord - init.minCoord)));
  });
});

describe('check extremum values', () => {
  const validCoord = Math.round((init.maxCoord - init.minCoord) / 2);
  it('check < min', () => {
    expect(sliderLogic.checkExtremumCoords(validCoord)).toEqual(validCoord);
  });
  it('check > max', () => {
    expect(sliderLogic.checkExtremumCoords(init.minCoord - 10)).toEqual(init.minCoord);
  });
  it('check normal value', () => {
    expect(sliderLogic.checkExtremumCoords(init.maxCoord + 10)).toEqual(init.maxCoord);
  });
});

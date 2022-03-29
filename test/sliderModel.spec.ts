import SliderModel from '../src/sliderModel';

const init = {
  sliderLength: 200,
  minCoordCustom: 0,
  maxCoordCustom: 100,
  step: 50,
};

let sliderModel = new SliderModel(init);
const multiplierFromCustom = 1 / ((init.maxCoordCustom - init.minCoordCustom) / init.sliderLength);

afterEach(() => {
  sliderModel = new SliderModel(init);
});

describe('check extremum values', () => {
  const validCoord = Math.round(init.sliderLength / 2);
  const minCoord = 0;
  const maxCoord = 100;

  it('check < min', () => {
    expect(sliderModel.checkExtremumCoords(validCoord, minCoord, maxCoord)).toEqual(validCoord);
  });
  it('check > max', () => {
    expect(sliderModel.checkExtremumCoords(minCoord - 10, minCoord, maxCoord)).toEqual(0);
  });
  it('check normal value', () => {
    expect(sliderModel.checkExtremumCoords(maxCoord + 10, minCoord, maxCoord)).toEqual(maxCoord);
  });
});

describe('check direction', () => {
  let currentCoord = init.sliderLength / 4;
  let cursorCoord = init.sliderLength / 2;

  it('right', () => {
    expect(sliderModel.checkDirection(currentCoord, cursorCoord)).toEqual(1);
  });
  it('left', () => {
    currentCoord = init.sliderLength / 2;
    cursorCoord = init.sliderLength / 4;
    expect(sliderModel.checkDirection(currentCoord, cursorCoord)).toEqual(-1);
  });
});

describe('get next value', () => {
  const currentCoord = init.sliderLength / 4;
  const min = 0;
  const max = init.sliderLength;
  const currentCursor = init.sliderLength / 2;
  it('next value', () => {
    expect(sliderModel.getNextValue(currentCoord, min, max, currentCursor)).toEqual(currentCoord + init.step * multiplierFromCustom);
  });
});

describe('set current value', () => {
  const currentValue = init.sliderLength / 4;
  let cursorCoord = currentValue + init.step * multiplierFromCustom + init.step * multiplierFromCustom / 2;
  let nextValue = currentValue + init.step * multiplierFromCustom;
  it('current value to right', () => {
    expect(sliderModel.setCurrentValue(currentValue, cursorCoord, nextValue)).toEqual(nextValue);
  });
  it('current value to left', () => {
    cursorCoord = currentValue - init.step * multiplierFromCustom - init.step * multiplierFromCustom / 2;
    nextValue = currentValue - init.step * multiplierFromCustom;
    expect(sliderModel.setCurrentValue(currentValue, cursorCoord, nextValue)).toEqual(nextValue);
  });
});

describe('set min-max', () => {
  const cursorCoordLow = init.step * multiplierFromCustom + init.step * multiplierFromCustom / 2;
  const cursorCoordUpper = init.sliderLength - init.step * multiplierFromCustom - init.step * multiplierFromCustom / 2;
  it('min value', () => {
    expect(sliderModel.setNextMin(cursorCoordLow)).toEqual(init.step * multiplierFromCustom);
  });
  it('max value', () => {
    expect(sliderModel.setNextMax(cursorCoordUpper)).toEqual(init.sliderLength - init.step * multiplierFromCustom);
  });
  
});

describe('get min-max', () => {
  it('min-max value', () => {
    expect(sliderModel.getMinMax()).toEqual([0, 200]);
  });
});

describe('get custom min-max', () => {
  it('value', () => {
    const valuesCustom = sliderModel.getMinMaxCustom();
    expect(valuesCustom).toEqual([0, 100]);
  });
});

describe('get custom min-max', () => {
  it('value', () => {
    const valuesCustom = sliderModel.setMinMaxCustom(init.maxCoordCustom / 4, init.maxCoordCustom / 2);
    expect(valuesCustom).toEqual([(init.maxCoordCustom / 4) * multiplierFromCustom, (init.maxCoordCustom / 2) * multiplierFromCustom]);
  });
});

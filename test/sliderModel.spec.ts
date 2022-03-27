import SliderModel from '../src/sliderModel';

const init = {
  sliderLength: 200,
  minCoordCustom: 0,
  maxCoordCustom: 100,
  step: 50,
};

const sliderModel = new SliderModel(init);

afterEach(() => {
  sliderModel.currentLow = 0;
  sliderModel.currentUpper = init.sliderLength;
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
    expect(sliderModel.getNextValue(currentCoord, min, max, currentCursor)).toEqual(currentCoord + init.step);
  });
});

describe('set current value', () => {
  const currentValue = init.sliderLength / 4;
  let cursorCoord = currentValue + init.step + init.step / 2;
  let nextValue = currentValue + init.step;
  it('current value to right', () => {
    expect(sliderModel.setCurrentValue(currentValue, cursorCoord, nextValue)).toEqual(nextValue);
  });
  it('current value to left', () => {
    cursorCoord = currentValue - init.step - init.step / 2;
    nextValue = currentValue - init.step;
    expect(sliderModel.setCurrentValue(currentValue, cursorCoord, nextValue)).toEqual(nextValue);
  });
});

describe('set min-max', () => {
  const cursorCoordLow = init.step + init.step / 2;
  const cursorCoordUpper = init.sliderLength - init.step - init.step / 2;
  it('min value', () => {
    expect(sliderModel.setMin(cursorCoordLow)).toEqual(init.step);
  });
  it('max value', () => {
    expect(sliderModel.setMax(cursorCoordUpper)).toEqual(init.sliderLength - init.step);
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
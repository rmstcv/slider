import SliderModel from '../src/Model/sliderModel';

const init = {
  sliderMin: 0,
  sliderMax: 30,
  step: 2,
};

let sliderModel = new SliderModel(init);
sliderModel.newPosition = init.sliderMin + init.step;

afterEach(() => {
  sliderModel = new SliderModel(init);
  sliderModel.newPosition = init.sliderMin + init.step;
});

describe('check extremum values', () => {
  const validCoord = Math.round((init.sliderMax - init.sliderMin) / 2);
  const minCoord = init.sliderMin;
  const maxCoord = init.sliderMax;

  it('check < min', () => {
    expect(sliderModel.checkExtremumValues(validCoord, minCoord, maxCoord)).toEqual(validCoord);
  });
  it('check > max', () => {
    expect(sliderModel.checkExtremumValues(minCoord - 10, minCoord, maxCoord)).toEqual(0);
  });
  it('check normal value', () => {
    expect(sliderModel.checkExtremumValues(maxCoord + 10, minCoord, maxCoord)).toEqual(maxCoord);
  });
});

describe('find next value', () => {
  const currentValue = init.sliderMin ;
  const min = init.sliderMin;
  const max = init.sliderMax;
  it('next value', () => {
    expect(sliderModel.findNextValue(currentValue, min, max)).toEqual(currentValue + init.step);
  });
});

describe('set new values', () => {
  it('set new min values', () => {
    expect(sliderModel.setNewLowValue(init.sliderMin + 2 * init.step)).toEqual(init.sliderMin + 2 * init.step);
    expect(sliderModel.setNewLowValue(init.sliderMin - init.step)).toEqual(init.sliderMin);
    expect(sliderModel.setNewLowValue(sliderModel.currentUp + init.step)).toEqual(sliderModel.currentLow);
  });
  it('set new max values', () => {
    expect(sliderModel.setNewUpValue(init.sliderMax - (3 / 2) * init.step)).toEqual(init.sliderMax - init.step);
    expect(sliderModel.setNewUpValue(init.sliderMax + init.step)).toEqual(init.sliderMax);
    expect(sliderModel.setNewUpValue(sliderModel.currentLow - init.step)).toEqual(sliderModel.currentLow);
  });
});

describe('update values', () => {
  const min = init.sliderMin + init.step;
  const max = init.sliderMax - (3 / 2) * init.step;
  it('update values', () => {
    expect(sliderModel.update([min, max])).toEqual([init.sliderMin + init.step, init.sliderMax - init.step]);
  });
});

describe('get values', () => {
  it('get values', () => {
    expect(sliderModel.getValues()).toEqual([sliderModel.currentLow, sliderModel.currentUp]);
  });
});

describe('set values', () => {
  it('set values', () => {
    expect(sliderModel.setValues([init.sliderMin - init.step, init.sliderMax])).toEqual([sliderModel.sliderMin, sliderModel.sliderMax]);
  });
});

describe('set step', () => {
  it('set step', () => {
    expect(sliderModel.setStep(init.step / 2)).toEqual(init.step / 2);
  });
});

describe('initialization', () => {
  it('init', () => {
    expect(sliderModel.init([init.sliderMin + init.step / 2, init.sliderMax])).toEqual([sliderModel.currentLow, sliderModel.currentUp]);
  });
});

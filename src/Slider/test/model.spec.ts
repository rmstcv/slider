import SliderModel from '../Model/Model';

const init: Init = {
  min: -10,
  max: 0.0000,
  step: 0.0005,
  valueFrom: -5,
  valueTo: 0.0000,
  type: 'range',
  orientation: 'horizontal',
  scale: true,
  toolTip: true,
};

let sliderModel = new SliderModel(init);
afterEach(() => {
  sliderModel = new SliderModel(init);
});

describe('check setState', () => {
  it('check set type', () => {
    sliderModel.setState('type', 'single');
    expect(sliderModel.state.type).toEqual('single');
  });
  it('check set orientation', () => {
    sliderModel.setState('orientation', 'vertical');
    expect(sliderModel.state.orientation).toEqual('vertical');
  });
  it('check set scale', () => {
    sliderModel.setState('scale', false);
    expect(sliderModel.state.scale).toBeFalsy();
  });
  it('check set tooltip', () => {
    sliderModel.setState('toolTip', false);
    expect(sliderModel.state.toolTip).toBeFalsy();
  });
  it('check set step', () => {
    sliderModel.setState('step', init.step / 2);
    expect(sliderModel.state.step).toEqual(init.step / 2);
  });
  it('check set valueTo', () => {
    sliderModel.setState('valueTo', init.valueTo - init.step);
    expect(sliderModel.state.valueTo).toEqual(init.valueTo - init.step);
  });
  it('check set valueFrom', () => {
    sliderModel.setState('valueFrom', init.valueFrom + init.step);
    expect(sliderModel.state.valueFrom).toEqual(init.valueFrom + init.step);
  });
  it('check set min', () => {
    sliderModel.setState('min', init.min - init.step);
    expect(sliderModel.state.min).toEqual(init.min - init.step);
  });
  it('check set max', () => {
    sliderModel.setState('max', init.max + init.step);
    expect(sliderModel.state.max).toEqual(init.max + init.step);
  });
});

describe('check change values', () => {
  it('change min', () => {
    sliderModel.changeValues([init.valueFrom + 1.5 * init.step, undefined]);
    expect(sliderModel.state.valueFrom).toEqual((init.valueFrom + init.step));
  });
  it('change max', () => {
    sliderModel.changeValues([undefined, init.valueTo - 1.5 * init.step]);
    expect(sliderModel.state.valueTo).toEqual(init.valueTo - init.step);
  });
});

describe('check get state', () => {
  it('get state', () => {
    const state = sliderModel.getState();
    expect(state).toEqual(init);
  });
});

describe('check set custom function', () => {
  const func = () => {return init;};
  it('set custom function', () => {
    sliderModel.setCustomFunction(func);
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(sliderModel['customFunction']).toEqual(func);
  });
});

describe('check type and set valueFrom', () => {
  it('check type', () => {
    sliderModel.state.type = 'single';
    // eslint-disable-next-line @typescript-eslint/dot-notation
    sliderModel['checkType']();
    expect(sliderModel.state.valueFrom).toEqual(sliderModel.state.min);
  });  
});

describe('find next value', () => {
  const currentValue = sliderModel.state.valueFrom;
  const receivedValue = currentValue + (3 * sliderModel.state.step / 2) ;
  it('next value', () => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(sliderModel['findNextValue'](currentValue, receivedValue)).toEqual(currentValue + sliderModel.state.step);
  });
});

describe('check extremum values', () => {
  it('extremum values', () => {
    const min = sliderModel.state.min;
    const max = sliderModel.state.max;
    const step = sliderModel.state.step;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(sliderModel['checkExtremumValues'](max - step, min, max)).toEqual(max - step);
  });
});

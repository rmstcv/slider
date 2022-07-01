import ToolTip from '../src/Slider/View/subViews/ToolTip';
/* eslint-disable @typescript-eslint/dot-notation */

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

let toolTip = new ToolTip(init);
afterEach(() => {
  toolTip = new ToolTip(init);
});

it('check update state', () => {
  toolTip.updateObserver({ ...init, min: -20 });
  expect(toolTip['initOptions'].min).toEqual(-20);
});

it('check update (tooltip true)', () => {
  toolTip.updateObserver(init);
  expect(toolTip['lowerCount'].innerHTML).toEqual(toolTip['initOptions'].valueFrom.toString());
  expect(toolTip['upperCount'].innerHTML).toEqual(toolTip['initOptions'].valueTo.toString());
  expect(toolTip['lowerCount'].classList.contains('slider__handle-lower-count_hidden')).toBeFalsy();
});

it('check update (tooltip false)', () => {
  toolTip.updateObserver({ ...init, toolTip: false });
  expect(toolTip['upperCount'].classList.contains('slider__handle-upper-count_hidden')).toBeTruthy();
});

it('check get elems', () => {
  expect(toolTip.getElems()).toEqual([toolTip['lowerCount'], toolTip['upperCount']]);
});

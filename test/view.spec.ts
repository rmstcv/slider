import SliderView from '../src/Slider/View/View';
import SliderPresenter from '../src/Slider/Presenter/Presenter';
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

let sliderElem = document.createElement('div');
document.body.appendChild(sliderElem);
const sliderPresenter = new SliderPresenter(sliderElem, init);
let sliderView = new SliderView(sliderElem, sliderPresenter, init);
afterEach(() => {
  sliderElem.remove();
  sliderElem = document.createElement('div');
  document.body.appendChild(sliderElem);
  sliderView = new SliderView(sliderElem, sliderPresenter, init);
});

it('check create slider', () => {
  expect(sliderElem.childNodes.length).toBe(2);
});

it('check create elements', () => {
  expect(sliderView['handlers']).toBeTruthy();
  expect(sliderView['toolTip']).toBeTruthy();
  expect(sliderView['progressBar']).toBeTruthy();
});

it('check create append elements', () => {
  expect(sliderView['tracker'].childNodes.length).toBe(3);
});

it('check observers create', () => {
  expect(sliderView['observers'].length).toBe(4);
});

describe('check update view', () => {

  it('check update state', () => {
    sliderView.updateView({ ...init, min: -20 });
    expect(sliderView['initOptions'].min).toBe(-20);
  });

  it('check skider orientation (vertical)', () => {
    sliderView.updateView({ ...init, orientation: 'vertical' });
    expect(sliderView['slider'].classList.contains('slider_vertical')).toBeTruthy();
  });

  it('check update observers', () => {
    sliderView.updateView({ ...init, min: -20 });
    sliderView['observers'].forEach((observer) => {
      // @ts-ignore
      expect(observer['initOptions'].min).toBe(-20);
    });
  });
});

it('check toSubscribeScaleOnView', () => {
  const spyGetScaleValues = jest.spyOn(sliderView['scale'], 'getScaleValues');
  const spySetSlider = jest.spyOn(sliderView['presenter'], 'setSlider');
  // @ts-ignore
  spyGetScaleValues.mockReturnValueOnce(1);
  // @ts-ignore
  sliderView.toSubscribeScaleOnView();
  sliderElem.childNodes[0].dispatchEvent(new MouseEvent('click'));
  expect(spySetSlider).toBeCalled();
});

it('check toSubscribeHandlersOnView', () => {
  const spyGetHandlerElems = jest.spyOn(sliderView['handlers'], 'getHandlerElems');
  // @ts-ignore
  const spyAddEvents = jest.spyOn(sliderView, 'addEvents');
  // @ts-ignore
  const spyUpdateHandlers = jest.spyOn(sliderView, 'updateHandlers');
  // @ts-ignore
  spyGetHandlerElems.mockReturnValueOnce([sliderElem.childNodes[0]]);
  // @ts-ignore
  sliderView.toSubscribeHandlersOnView();
  sliderElem.childNodes[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
  expect(spyUpdateHandlers).toBeCalled();
  sliderElem.childNodes[0].dispatchEvent(new MouseEvent('mousedown'));
  expect(spyAddEvents).toBeCalled();
});
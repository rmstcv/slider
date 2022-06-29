/* eslint-disable @typescript-eslint/dot-notation */
import SliderHandlers from '../src/Slider/View/subViews/Handlers';
 
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
let sliderHandlers = new SliderHandlers(sliderElem, init);
sliderElem.style.width = '100px';
sliderElem.style.height = '10px';
afterEach(() => {
  sliderElem.remove();
  sliderElem = document.createElement('div');
  sliderElem.style.width = '100px';
  sliderElem.style.height = '10px';
  document.body.appendChild(sliderElem);
  sliderHandlers = new SliderHandlers(sliderElem, init);
});

it('handlers update', () => {
  // @ts-ignore
  const spyLeftHandler = jest.spyOn(sliderHandlers, 'shiftLeftHandler');
  // @ts-ignore
  const spyRightHandler = jest.spyOn(sliderHandlers, 'shiftRightHandler'); 
  sliderHandlers['handlersUpdate']();
  expect(spyLeftHandler).toHaveBeenCalled();
  expect(spyRightHandler).toHaveBeenCalled();
});

it('get handlers elems', () => {
  expect(sliderHandlers.getHandlerElems().length).toBe(2);
});

describe('get coords', () => {
  // @ts-ignore
  let spy = jest.spyOn(sliderHandlers, 'checkSliderOrientation');
  beforeEach(() => {
    // @ts-ignore
    spy = jest.spyOn(sliderHandlers, 'checkSliderOrientation');
    // @ts-ignore
    spy.mockReturnValueOnce(1);
  });

  afterEach(() => {
    spy.mockRestore();
  });
  let mouse = new MouseEvent('click');
  it('check mouse event upper', () => {
    const getCoords = sliderHandlers.getHandlersCoords(sliderHandlers['upper'], mouse);
    expect(getCoords).toEqual([undefined, sliderHandlers['initOptions'].min]);
  });

  it('check mouse event lower', () => {
    const getCoords = sliderHandlers.getHandlersCoords(sliderHandlers['lower'], mouse);
    expect(getCoords).toEqual([ sliderHandlers['initOptions'].min, undefined]);
  });
});

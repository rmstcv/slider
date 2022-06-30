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

afterEach(() => {
  sliderElem.remove();
  sliderElem = document.createElement('div');
  document.body.appendChild(sliderElem);
  sliderHandlers = new SliderHandlers(sliderElem, init);
});

describe('check updateObserver', () => {
  const newInit: Init = {
    min: -10,
    max: 10,
    step: 1,
    valueFrom: -5,
    valueTo: 5,
    type: 'single',
    orientation: 'vertical',
    scale: false,
    toolTip: false,
  };

  // @ts-ignore
  const spyLeftHandler = jest.spyOn(sliderHandlers, 'shiftLeftHandler');
  // @ts-ignore
  const spyRightHandler = jest.spyOn(sliderHandlers, 'shiftRightHandler'); 
  // @ts-ignore
  const spyConvertToPercent = jest.spyOn(sliderHandlers, 'convertToPercent');
  // @ts-ignore
  const spyHandlersUpdate = jest.spyOn(sliderHandlers, 'handlersUpdate');
  // @ts-ignore
  const spyToggleHandlersOrder = jest.spyOn(sliderHandlers, 'toggleHandlersOrder'); 
  
  beforeEach(() => {
    sliderHandlers.updateObserver(newInit);
  });

  it('check updateState', () => {
    expect(sliderHandlers['initOptions'].max).toBe(newInit.max);
  });

  it('check checkOrientation', () => {
    expect(sliderHandlers['upper'].style.left).toEqual('');
    expect(sliderHandlers['lower'].style.left).toEqual('');
  });

  it('check handlers update', () => {
    expect(spyHandlersUpdate).toHaveBeenCalled();
    expect(spyConvertToPercent).toHaveBeenCalledWith(newInit.valueFrom);
    expect(spyLeftHandler).toHaveBeenCalledWith(25);
    expect(spyRightHandler).toHaveBeenCalledWith(75);
  });

  it('check checkType', () => {
    expect(sliderHandlers['lower'].classList.contains('slider__handle-lower_hidden')).toBe(true);
  });

  it('check toggleHandlersOrder', () => {
    expect(spyToggleHandlersOrder).toHaveBeenCalled();
  });

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
  let touch = new TouchEvent('touchmove');
  let key = new KeyboardEvent('keypress', { key: 'ArrowRight' });
  Object.defineProperties(touch, {
    'touches': {
      value: [{ clientX: 0, clientY: 0 }],
    },
  });
  [mouse, touch].forEach((event) => {
    it(`check ${event} event upper`, () => {
      expect(sliderHandlers.getHandlersCoords(sliderHandlers['upper'], event))
        .toEqual([undefined, sliderHandlers['initOptions'].min]);
    });
  });

  [mouse, touch].forEach((event) => {
    it(`check ${event} event upper vertical`, () => {
      sliderHandlers['initOptions'].orientation = 'vertical';
      expect(sliderHandlers.getHandlersCoords(sliderHandlers['upper'], event))
        .toEqual([undefined, sliderHandlers['initOptions'].min]);
    });
  });

  [mouse, touch].forEach((event) => {
    it(`check ${event} event lower`, () => {
      expect(sliderHandlers.getHandlersCoords(sliderHandlers['lower'], event))
        .toEqual([sliderHandlers['initOptions'].min, undefined]);
    });
  });

  [mouse, touch].forEach((event) => {
    it(`check ${event} event lower vertical`, () => {
      sliderHandlers['initOptions'].orientation = 'vertical';
      expect(sliderHandlers.getHandlersCoords(sliderHandlers['lower'], event))
        .toEqual([sliderHandlers['initOptions'].min, undefined]);
    });
  });

  it('check keyboard event upper', () => {
    // @ts-ignore
    const spyConvertFromCustom = jest.spyOn(sliderHandlers, 'convertFromCustom'); 
    // @ts-ignore
    spyConvertFromCustom.mockReturnValueOnce(1);
    expect(sliderHandlers.getHandlersCoords(sliderHandlers['upper'], key)).toEqual([undefined, 0]);
  });

  it('check keyboard event upper (vertical)', () => {
    sliderHandlers['initOptions'].orientation = 'vertical';
    // @ts-ignore
    const spyConvertFromCustom = jest.spyOn(sliderHandlers, 'convertFromCustom'); 
    // @ts-ignore
    spyConvertFromCustom.mockReturnValueOnce(1);
    expect(sliderHandlers.getHandlersCoords(sliderHandlers['upper'], key)).toEqual([undefined, 0]);
  });

  it('check keyboard event lower', () => {
    // @ts-ignore
    const spyConvertFromCustom = jest.spyOn(sliderHandlers, 'convertFromCustom'); 
    // @ts-ignore
    spyConvertFromCustom.mockReturnValueOnce(1);
    expect(sliderHandlers.getHandlersCoords(sliderHandlers['lower'], key)).toEqual([0, undefined]);
  });

  it('check keyboard event lower (vertical)', () => {
    sliderHandlers['initOptions'].orientation = 'vertical';
    // @ts-ignore
    const spyConvertFromCustom = jest.spyOn(sliderHandlers, 'convertFromCustom'); 
    // @ts-ignore
    spyConvertFromCustom.mockReturnValueOnce(1);
    expect(sliderHandlers.getHandlersCoords(sliderHandlers['lower'], key)).toEqual([0, undefined]);
  });
});

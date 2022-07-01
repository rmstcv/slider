import Scale from '../src/Slider/View/subViews/Scale';
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
let scale = new Scale(sliderElem, init);

afterEach(() => {
  sliderElem.remove();
  sliderElem = document.createElement('div');
  document.body.appendChild(sliderElem);
  scale = new Scale(sliderElem, init);
});

it('check create elems', () => {
  expect(sliderElem.children.length).toEqual(2);
});

it('check get scale values', () => {
  const scaleValElem = sliderElem.querySelector('.slider__scale-marker-value') as HTMLElement;
  expect(scale.getScaleValues(scaleValElem)).toEqual(scale['initOptions'].min);
});

it('check update state', () => {
  scale.updateObserver({ ...init, min: -20 });
  expect(scale['initOptions'].min).toEqual(-20);
});


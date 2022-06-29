import SliderView from '../src/Slider/View/View';
import SliderPresenter from '../src/Slider/Presenter/Presenter';
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

it('create slider', () => {
  expect(sliderElem.childNodes.length).toBe(2);
});
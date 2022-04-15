import sliderCreate from './jquery.slider-plugin';

const slider = document.querySelector('.slider') as HTMLElement;
const rangeSlider = sliderCreate(slider, {
  min: 0,
  max: 30,
  step: 2,
  setMin: 4,
  setMax: 16,
  sliderType: 'range',
  orientation: 'horizontal',
  scale: true,
  toolTip: true,
});

const lower: HTMLInputElement = document.querySelector('.slider__handle-lower')!;
const upper: HTMLInputElement = document.querySelector('.slider__handle-upper')!;
const minInput: HTMLInputElement = document.querySelector('.config-input_min')!;
const maxInput: HTMLInputElement = document.querySelector('.config-input_max')!;

minInput.setAttribute('step', rangeSlider.getStep());
minInput.setAttribute('min', '0');
maxInput.setAttribute('max', '30');
maxInput.setAttribute('step', rangeSlider.getStep());

minInput?.addEventListener('input', () => {
  rangeSlider.setValues([minInput.value, undefined]);
  minInput.setAttribute('max', `${upper?.getAttribute('data-upper')}`);
});
maxInput?.addEventListener('input', () => {
  rangeSlider.setValues([undefined, maxInput.value]);
  maxInput.setAttribute('min', `${lower?.getAttribute('data-lower')}`);
});

minInput.value = rangeSlider.getValues()[0];
maxInput.value = rangeSlider.getValues()[1];

document.addEventListener('mousemove', () => {
  minInput.value = rangeSlider.getValues()[0];
  maxInput.value = rangeSlider.getValues()[1];
});
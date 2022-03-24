import SliderLogic from './sliderLogic';
import SliderView from './sliderView';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 100,
};

const sliderLogic = new SliderLogic(init);

const sliderView = new SliderView(document.querySelector('.slider'), init.sliderLength);
const lower: HTMLElement = document.querySelector('.slider__handle-lower');
const upper: HTMLElement = document.querySelector('.slider__handle-upper');
const slider = document.querySelector('.slider');
let minCoordPrev: number = 0;

function getValues(e: MouseEvent, elem: HTMLElement) {
  minCoordPrev = e.pageX;
  if (elem === lower) {
    sliderLogic.currentCoordMin = e.pageX - slider.getBoundingClientRect().left;
  } 
  if (elem === upper) {
    sliderLogic.currentCoordMax = e.pageX - slider.getBoundingClientRect().left;
  } 

  return [sliderLogic.setMin(), sliderLogic.setMax()];
}

function showValues() {
  const [min, max] = [sliderLogic.setMin(), sliderLogic.setMax()];
  sliderView.showValues([min, max]);
}

function addEvents(elem: HTMLElement) {
  
  function shift(e: MouseEvent) {
    if (minCoordPrev < e.pageX) {
      sliderLogic.direction = 1;
    }
    if (minCoordPrev > e.pageX) {
      sliderLogic.direction = - 1;
    }
    
    sliderView.shift(elem, getValues(e, elem));  
  }
  
  document.addEventListener('mousemove', shift);
  document.addEventListener('mousemove', showValues);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', shift);
    document.removeEventListener('mousemove', showValues);
    document.onmouseup = null;
  });
  document.ondragstart = function () {
    return false;
  };
}

function addListeners() {
  sliderView.showValues([init.minCoordCustom, init.maxCoordCustom]);
  upper.addEventListener('mousedown', () => addEvents(upper));
  lower.addEventListener('mousedown', () => addEvents(lower));
}

addListeners();

export { init, sliderLogic };
import SliderLogic from '../src/sliderLogic';

window.addEventListener('DOMContentLoaded', () => {
  const upper: HTMLElement = document.querySelector('.slider__handle-upper');
  const lower: HTMLElement = document.querySelector('.slider__handle-lower');
  const slider: HTMLElement = document.querySelector('.slider');

  const init = {
    minCoord: 0,
    maxCoord: 400,
    minCoordCustom: 0,
    maxCoordCustom: 100,
  };

  const sliderLogic = new SliderLogic(init);

  let currentLowValue = init.minCoord;
  let currentUpperValue = init.maxCoord;

  function getValues() {
    document.querySelector('.slider__values-lower').innerHTML = sliderLogic.toCustomValue(currentLowValue).toString();
    document.querySelector('.slider__values-upper').innerHTML = sliderLogic.toCustomValue(currentUpperValue).toString();
  }

  function shift(elem: HTMLElement, e: MouseEvent) {
    
    let minCoordShift = lower.getBoundingClientRect().right - lower.offsetWidth / 2 - slider.getBoundingClientRect().left;
    let maxCoordShift = upper.getBoundingClientRect().left - slider.getBoundingClientRect().left - lower.offsetWidth / 2;

    if (elem === lower) {
      minCoordShift = 0;
      maxCoordShift = upper.getBoundingClientRect().left + lower.offsetWidth / 2 - slider.getBoundingClientRect().left;
      currentLowValue = sliderLogic.checkExtremumCoords(e.pageX - slider.getBoundingClientRect().left);
    }
    if (elem === upper) {
      minCoordShift = lower.getBoundingClientRect().left - slider.getBoundingClientRect().left + upper.offsetWidth / 2;
      maxCoordShift = slider.getBoundingClientRect().right - slider.getBoundingClientRect().left;
      currentUpperValue = sliderLogic.checkExtremumCoords(e.pageX - slider.getBoundingClientRect().left);
    }
    
    if (e.pageX - slider.getBoundingClientRect().left >= minCoordShift && e.pageX - slider.getBoundingClientRect().left <= maxCoordShift) {
      elem.style.left = sliderLogic.checkExtremumCoords(e.pageX - slider.getBoundingClientRect().left) + 'px';
      getValues();     
    }
  }

  function addEvents(elem: HTMLElement) {
    const bindShift = shift.bind(null, elem);
    document.addEventListener('mousemove', bindShift);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', bindShift);
      elem.onmouseup = null;
    });
    elem.ondragstart = function () {
      return false;
    };
  }
  getValues();

  upper.addEventListener('mousedown', () => addEvents(upper));
  lower.addEventListener('mousedown', () => addEvents(lower));
});

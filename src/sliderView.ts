import { init, sliderLogic } from '../src/sliderController';

window.addEventListener('DOMContentLoaded', () => {
  const upper: HTMLElement = document.querySelector('.slider__handle-upper');
  const lower: HTMLElement = document.querySelector('.slider__handle-lower');
  const slider: HTMLElement = document.querySelector('.slider');

  let currentLowValue = init.minCoord;
  let currentUpperValue = init.maxCoord;

  function highlight() {
    const sliderHighlight: HTMLElement = document.querySelector('.slider__highlight');
    sliderHighlight.style.width = upper.getBoundingClientRect().left - lower.getBoundingClientRect().right + 'px';
    sliderHighlight.style.left = lower.getBoundingClientRect().right - slider.getBoundingClientRect().left + 'px';
  }

  function getValues() {
    document.querySelector('.slider__values-lower').innerHTML = sliderLogic.toCustomValue(currentLowValue).toString();
    document.querySelector('.slider__values-upper').innerHTML = sliderLogic.toCustomValue(currentUpperValue).toString();
  }

  function shift(elem: HTMLElement, e: MouseEvent) {
    const sliderLeftCoord = slider.getBoundingClientRect().left;
    
    let minCoordShift = lower.getBoundingClientRect().right - lower.offsetWidth / 2 - sliderLeftCoord;
    let maxCoordShift = upper.getBoundingClientRect().left - sliderLeftCoord - lower.offsetWidth / 2;

    if (elem === lower) {
      minCoordShift = 0;
      maxCoordShift = upper.getBoundingClientRect().left + lower.offsetWidth / 2 - sliderLeftCoord;
      currentLowValue = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord);
      lower.style.zIndex = '10';
      upper.style.zIndex = '1';
    }
    if (elem === upper) {
      minCoordShift = lower.getBoundingClientRect().left - sliderLeftCoord + upper.offsetWidth / 2;
      maxCoordShift = slider.getBoundingClientRect().right - sliderLeftCoord;
      currentUpperValue = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord);
      upper.style.zIndex = '10';
      lower.style.zIndex = '1';
    }
    
    if (e.pageX - sliderLeftCoord >= minCoordShift && e.pageX - sliderLeftCoord <= maxCoordShift) {
      elem.style.left = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord) + 'px';
      getValues();   
      highlight();
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

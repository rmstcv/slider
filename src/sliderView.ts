import { init, sliderLogic } from '../src/sliderController';

window.addEventListener('DOMContentLoaded', () => {
  const upper: HTMLElement = document.querySelector('.slider__handle-upper');
  const lower: HTMLElement = document.querySelector('.slider__handle-lower');
  const slider: HTMLElement = document.querySelector('.slider');
  const valueLower: HTMLElement = document.querySelector('.slider__values-lower');
  const valueUpper: HTMLElement = document.querySelector('.slider__values-upper');
  const sliderLeftCoord = slider.getBoundingClientRect().left;
  const sliderRightCoord = slider.getBoundingClientRect().right;

  let currentLowValue = 0;
  let currentUpperValue = init.sliderLength;

  function progressHighlight(minCoord: number, maxCoord: number) {
    const sliderHighlight: HTMLElement = document.querySelector('.slider__highlight');
    const progressLength = maxCoord - minCoord;
    if ( progressLength >= 0 ) {
      sliderHighlight.style.width = progressLength + 'px';
      sliderHighlight.style.left = minCoord - slider.getBoundingClientRect().left + 'px';
    } else {
      sliderHighlight.style.width = 0 + 'px';
    }  
  }

  function getValues() {
    valueLower.innerHTML = sliderLogic.toCustomValue(currentLowValue).toString();
    valueUpper.innerHTML = sliderLogic.toCustomValue(currentUpperValue).toString();
  }

  function shift(elem: HTMLElement, e: MouseEvent) {
    
    const minCoord = lower.getBoundingClientRect().right;
    const maxCoord = upper.getBoundingClientRect().left;

    let minCoordShift = minCoord - lower.offsetWidth / 2 - sliderLeftCoord;
    let maxCoordShift = maxCoord - sliderLeftCoord - lower.offsetWidth / 2;

    if (elem === lower) {
      minCoordShift = 0;
      maxCoordShift = maxCoord + lower.offsetWidth / 2 - sliderLeftCoord;
      currentLowValue = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord, minCoordShift, maxCoordShift);
      lower.style.zIndex = '10';
      upper.style.zIndex = '1';
    }
    if (elem === upper) {
      minCoordShift = minCoord - upper.offsetWidth - sliderLeftCoord + upper.offsetWidth / 2;
      maxCoordShift = sliderRightCoord - sliderLeftCoord;
      currentUpperValue = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord, minCoordShift, maxCoordShift);
      upper.style.zIndex = '10';
      lower.style.zIndex = '1';
    }
    elem.style.left = sliderLogic.checkExtremumCoords(e.pageX - sliderLeftCoord, minCoordShift, maxCoordShift) + 'px';
    getValues();
    progressHighlight(minCoord, maxCoord);
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

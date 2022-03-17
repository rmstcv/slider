import SliderLogic from '../src/sliderLogic';

window.addEventListener('DOMContentLoaded', () => {
  const upper: HTMLElement = document.querySelector('.slider__handle-upper');
  const lower: HTMLElement = document.querySelector('.slider__handle-lower');
  const slider: HTMLElement = document.querySelector('.slider');
  const sliderLogic = new SliderLogic();

  let currentLowValue = 0;
  let currentUpperValue = 80;

  function getValues() {
    document.querySelector('.slider__values-lower').innerHTML = sliderLogic.toCustomValue(currentLowValue).toString();
    document.querySelector('.slider__values-upper').innerHTML = sliderLogic.toCustomValue(currentUpperValue).toString();
  }
  function shift(elem: HTMLElement, e: MouseEvent) {
    let minCoord = lower.getBoundingClientRect().right - slider.getBoundingClientRect().left;
    let maxCoord = upper.getBoundingClientRect().left - slider.getBoundingClientRect().left - lower.offsetWidth;

    if (elem.getBoundingClientRect().right <= upper.getBoundingClientRect().left) {
      minCoord = 0;
      maxCoord = upper.getBoundingClientRect().left - slider.getBoundingClientRect().left - lower.offsetWidth;
      currentLowValue = sliderLogic.checkExtremumCoords(minCoord, maxCoord);
    }
    if (elem.getBoundingClientRect().left >= lower.getBoundingClientRect().right) {
      minCoord = lower.getBoundingClientRect().right - slider.getBoundingClientRect().left;
      maxCoord = slider.offsetWidth - lower.offsetWidth;
      currentUpperValue = sliderLogic.checkExtremumCoords(minCoord, maxCoord)  - lower.offsetWidth;
    }
    sliderLogic.setActualCoord = e.pageX - 5 * elem.offsetWidth / 4;
    elem.style.left = sliderLogic.checkExtremumCoords(minCoord, maxCoord) + 'px';
    if (currentLowValue >= 0 && currentUpperValue <= 80) {
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

  upper.addEventListener('mousedown', () => addEvents(upper));
  lower.addEventListener('mousedown', () => addEvents(lower));
});

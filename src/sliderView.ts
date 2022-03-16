import SliderLogic from '../src/sliderLogic';

window.addEventListener('DOMContentLoaded', () => {
  const upper: HTMLElement = document.querySelector('.slider__handle-upper');
  const lower = document.querySelector<HTMLElement>('.slider__handle-lower');
  const slider = document.querySelector<HTMLElement>('.slider');
  const sliderLogic = new SliderLogic();

  let currentLowValue = 0;
  let currentUpperValue = 80;

  function getValues() {
    console.log('minVAlue: ', currentLowValue, 'maxValue: ', currentUpperValue);
  }


  function shift(elem: HTMLElement, e: MouseEvent) {
    let minCoord = lower.getBoundingClientRect().right - slider.getBoundingClientRect().left;
    let maxCoord = upper.getBoundingClientRect().left - slider.getBoundingClientRect().left - lower.offsetWidth;

    if (elem.getBoundingClientRect().right <= upper.getBoundingClientRect().left) {
      minCoord = 0;
      maxCoord = upper.getBoundingClientRect().left - slider.getBoundingClientRect().left - lower.offsetWidth;
    }
    if (elem.getBoundingClientRect().left >= lower.getBoundingClientRect().right) {
      minCoord = lower.getBoundingClientRect().right - slider.getBoundingClientRect().left;
      maxCoord = slider.offsetWidth - lower.offsetWidth;
    }

    sliderLogic.setActualCoord = e.pageX - 5 * elem.offsetWidth / 4;
    elem.style.left = sliderLogic.checkExtremumCoords(minCoord, maxCoord) + 'px';
    if (e.target === lower && e.target === elem) {
      currentLowValue = sliderLogic.checkExtremumCoords(minCoord, maxCoord);
    }  
    if (e.target === upper && e.target === elem) {
      currentUpperValue = sliderLogic.checkExtremumCoords(minCoord, maxCoord)  - lower.offsetWidth;
    }
    getValues();
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

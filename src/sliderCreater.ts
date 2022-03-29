function createSliderView(slider: HTMLElement) {

  const sliderContent: string =
  '<div class="slider__handle-lower"><div class="slider__handle-lower-count">0</div></div>' +
  '<div class="slider__highlight"></div>' +
  '<div class="slider__handle-upper"><div class="slider__handle-upper-count">100</div></div>';

  slider.innerHTML = sliderContent;
  return slider;
}

createSliderView(document.querySelector('.slider'));
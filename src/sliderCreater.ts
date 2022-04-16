function createSliderView(slider: HTMLElement) {

  const sliderContent: string = `
  <div class="slider__tracker">
    <div class="slider__handle-lower">
      <div class="slider__handle-lower-count"></div>
    </div>
    <div class="slider__highlight"></div>
    <div class="slider__handle-upper">
      <div class="slider__handle-upper-count"></div>
    </div>
  </div>
  <div class="slider__scale">
  </div>
  <div class="slider__scale-value">
  </div>
  `;

  slider.innerHTML = sliderContent;
}

export default createSliderView;
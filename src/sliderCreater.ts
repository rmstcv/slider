function createSliderView(slider: HTMLElement) {

  const sliderContent: string = `
  <div class="slider__handle-lower">
    <div class="slider__handle-lower-count"></div>
  </div>
  <div class="slider__highlight"></div>
  <div class="slider__handle-upper">
    <div class="slider__handle-upper-count"></div>
  </div>
  <div class="slider__scale">
    <div class="slider__scale-marker slider__scale-marker_large"></div>
    <div class="slider__scale-marker"></div>
    <div class="slider__scale-marker slider__scale-marker_large"></div>
    <div class="slider__scale-marker"></div>
    <div class="slider__scale-marker slider__scale-marker_large"></div>
  </div>
  <div class="slider__scale-value">
    <div class="slider__scale-marker-value" style="left: 0px">0</div>
    <div class="slider__scale-marker-value" style="left: 200px">100</div>
    <div class="slider__scale-marker-value" style="left: 400px">200</div>
  </div>
  `;

  slider.innerHTML = sliderContent;
  return slider;
}

createSliderView(document.querySelector('.slider')!);
import searchElem from './searchElem';

interface InitViewScale {
  maxCustom: number,
  step: number,
  orientation?: 'vertical' | 'horizontal',
  sliderWidth: number
}

class SliderScale {
  slider: HTMLElement;

  initViewScale: InitViewScale;

  constructor(slider: HTMLElement, initViewScale: InitViewScale) {
    this.slider = slider;
    this.initViewScale = initViewScale;
  }

  createScail() {
    const scale = searchElem('.slider__scale', this.slider)!;
    scale.innerHTML = '';
    const scaleContainer = document.createElement('div');
    scaleContainer.classList.add('slider__scale-container');
    const scaleValue = searchElem('.slider__scale-value', this.slider)!;
    scaleValue.innerHTML = '';
    const scaleValueContainer = document.createElement('div');
    scaleValueContainer.classList.add('slider__scale-value-container');
    const scaleMultiplier = 4;
    const stepCustom = this.initViewScale.step * ((this.initViewScale.maxCustom / this.initViewScale.sliderWidth));
  
    for ( let i = 0; i <= (this.initViewScale.maxCustom / stepCustom) * scaleMultiplier; i += 1) {
      const elemScale: HTMLElement = document.createElement('div');
      elemScale.classList.add('slider__scale-marker');
      
      if (i % scaleMultiplier === 0) {   
        elemScale.classList.add('slider__scale-marker_large');
        const elemScaleValue: HTMLElement = document.createElement('div');
        elemScaleValue.classList.add('slider__scale-marker-value');
        elemScaleValue.setAttribute('data-value', `${i * stepCustom / scaleMultiplier}`);
        elemScaleValue.innerHTML = `${i * stepCustom / scaleMultiplier}`;
        if (this.initViewScale.orientation === 'vertical') {   
          elemScaleValue.style.top = `${100 * ((i * stepCustom / scaleMultiplier) / this.initViewScale.maxCustom)}%`;
                
        } else {
          elemScaleValue.style.left = `${100 * ((i * stepCustom / scaleMultiplier) / this.initViewScale.maxCustom)}%`;
        }
        scaleValueContainer.appendChild(elemScaleValue);
      }
      scaleContainer.appendChild(elemScale);
    }
    if (scale) {
      scale?.append(scaleContainer);
    } 
    if (scaleValue) {
      scaleValue?.append(scaleValueContainer);
    }
  }

  init() {
    this.createScail();
  }

}

export default SliderScale;
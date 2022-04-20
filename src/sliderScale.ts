import searchElem from './searchElem';

interface InitViewScale {
  minCustom: number,
  maxCustom: number,
  step: number,
  orientation?: 'vertical' | 'horizontal',
  sliderWidth: number
}

class SliderScale {
  slider: HTMLElement;

  initViewScale: InitViewScale;

  sliderSize: number;

  constructor(slider: HTMLElement, initViewScale: InitViewScale) {
    this.slider = slider;
    this.initViewScale = initViewScale;
    this.sliderSize = this.initViewScale.maxCustom - this.initViewScale.minCustom;
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
    const stepCustom = this.sliderSize / 10;
  
    for ( let i = 0; i <= (this.sliderSize / stepCustom) * scaleMultiplier; i += 1) {
      const elemScale: HTMLElement = document.createElement('div');
      elemScale.classList.add('slider__scale-marker');
      
      if (i % scaleMultiplier === 0) {   
        elemScale.classList.add('slider__scale-marker_large');
        const elemScaleValue: HTMLElement = document.createElement('div');
        elemScaleValue.classList.add('slider__scale-marker-value');
        elemScaleValue.setAttribute('data-value', `${i * stepCustom / scaleMultiplier + this.initViewScale.minCustom}`);
        elemScaleValue.innerHTML = `${i * stepCustom / scaleMultiplier + this.initViewScale.minCustom}`;

        if (this.initViewScale.orientation === 'vertical') {   
          elemScaleValue.style.top = `${100 * ((i * stepCustom / scaleMultiplier) / this.sliderSize)}%`;
                
        } else {
          elemScaleValue.style.left = `${100 * ((i * stepCustom / scaleMultiplier) / this.sliderSize)}%`;
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
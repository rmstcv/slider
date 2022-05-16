import searchElem from '../../searchElem';

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

  scale: HTMLElement;

  scaleValue: HTMLElement;

  constructor(slider: HTMLElement, initViewScale: InitViewScale) {
    this.slider = slider;
    this.initViewScale = initViewScale;
    this.sliderSize = this.initViewScale.maxCustom - this.initViewScale.minCustom;
    this.scale = searchElem('.slider__scale', this.slider) as HTMLElement;
    this.scaleValue = searchElem('.slider__scale-value', this.slider) as HTMLElement;
  }

  createScale() {
    this.scale.innerHTML = '';
    const scaleContainer = document.createElement('div');
    scaleContainer.classList.add('slider__scale-container');
    this.scaleValue.innerHTML = '';
    const scaleValueContainer = document.createElement('div');
    scaleValueContainer.classList.add('slider__scale-value-container');
    const scaleMultiplier = 4;
    const stepCustom = this.sliderSize / 10;
  
    for ( let i = 0; i <= (this.sliderSize / stepCustom) * scaleMultiplier; i += 1) {
      const elemScale: HTMLElement = document.createElement('div');
      elemScale.classList.add('slider__scale-marker');
      const valueHorizontal = parseFloat((i * stepCustom / scaleMultiplier + this.initViewScale.minCustom).toFixed(this.initViewScale.maxCustom.toString().length));
      const valueVertical = parseFloat((this.sliderSize - i * stepCustom / scaleMultiplier + this.initViewScale.minCustom).toFixed(this.initViewScale.maxCustom.toString().length));
      
      if (i % scaleMultiplier === 0) {   
        elemScale.classList.add('slider__scale-marker_large');
        const elemScaleValue: HTMLElement = document.createElement('div');
        elemScaleValue.classList.add('slider__scale-marker-value');
        if (this.initViewScale.orientation === 'vertical') {   
          elemScaleValue.style.top = `${100 * ((i * stepCustom / scaleMultiplier) / this.sliderSize)}%`;
          elemScaleValue.setAttribute('data-value', `${valueVertical}`);
          elemScaleValue.innerHTML = `${valueVertical}`;  
        } else {
          elemScaleValue.style.left = `${100 * ((i * stepCustom / scaleMultiplier) / this.sliderSize)}%`;
          elemScaleValue.setAttribute('data-value', `${valueHorizontal}`);
          elemScaleValue.innerHTML = `${valueHorizontal}`;
        }
        scaleValueContainer.appendChild(elemScaleValue);
      }
      scaleContainer.appendChild(elemScale);
    }
    if (this.scale) {
      this.scale?.append(scaleContainer);
    } 
    if (this.scaleValue) {
      this.scaleValue?.append(scaleValueContainer);
    }
  }

  setScale() {
    if (this.scale.style.display !== 'none') {
      this.scale.style.display = 'none';
      this.scaleValue.style.display = 'none';
    } else {
      this.scale.style.display = 'block';
      this.scaleValue.style.display = 'block';
    }
  }
}

export default SliderScale;
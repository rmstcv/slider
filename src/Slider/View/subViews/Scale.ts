class SliderScale {
  private slider: HTMLElement;

  private initOptions: Init;

  private scale!: HTMLElement;

  private scaleValue!: HTMLElement;

  constructor(slider: HTMLElement, initOptions: Init) {
    this.slider = slider;
    this.initOptions = { ...initOptions };
    this.init();
  }

  public updateObserver(state: Init): void {
    const { min, max, orientation, scale } = this.initOptions;
    this.updateState(state);

    if (
      min !== this.initOptions.min ||
      max !== this.initOptions.max ||
      orientation !== this.initOptions.orientation ||
      scale !== this.initOptions.scale
    ) this.update();
  }

  public updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  private init(): void {
    if (this.initOptions.scale) {
      this.createElemets();
      this.createScale();
    }
  }

  private createElemets(): void {
    this.scale = document.createElement('div');
    this.scale.classList.add('slider__scale');
    this.slider.appendChild(this.scale);
    this.scaleValue = document.createElement('div');
    this.scaleValue.classList.add('slider__scale-value');
    this.slider.appendChild(this.scaleValue);
  }

  private createScale(): void {
    const scaleMultiplier = 4;
    const { min, max, orientation } = this.initOptions;
    const sliderSize = max - min;
    const stepCustom = sliderSize / 10;
    const numOfDigits = max.toString().length - 1;

    for (let i = 0; i <= (sliderSize / stepCustom) * scaleMultiplier; i += 1) {
      const elemScale: HTMLElement = document.createElement('div');
      elemScale.classList.add('slider__scale-marker');
      const valueHorizontal = +(i * stepCustom / scaleMultiplier + min).toFixed(numOfDigits);
      const valueVertical = +(sliderSize - i * stepCustom / scaleMultiplier + min).toFixed(numOfDigits);
      
      if (i % scaleMultiplier === 0) {   
        elemScale.classList.add('slider__scale-marker_large');
        const elemScaleValue: HTMLElement = document.createElement('div');
        elemScaleValue.classList.add('slider__scale-marker-value');
        const percentagOffset = 100 * ((i * stepCustom / scaleMultiplier) / sliderSize);

        if (orientation === 'vertical') {   
          elemScaleValue.style.top = `${percentagOffset}%`;
          elemScaleValue.setAttribute('data-value', `${valueVertical}`);
          elemScaleValue.innerHTML = `${valueVertical}`;  
        } else {
          elemScaleValue.style.left = `${percentagOffset}%`;
          elemScaleValue.setAttribute('data-value', `${valueHorizontal}`);
          elemScaleValue.innerHTML = `${valueHorizontal}`;
        }
        this.scaleValue.appendChild(elemScaleValue);
      }
      this.scale.appendChild(elemScale);
    }
  }

  private destroyScale(): void {
    if (this.scale && this.scaleValue) {
      this.scale.remove();
      this.scaleValue.remove();
    }
  }

  public update(): void {    
    this.destroyScale();
    this.init();
  }

  public getScaleValues(target: HTMLElement): number | undefined {
    let scaleValue: number | undefined = undefined;

    if (target.classList.contains('slider__scale-marker-value')) {
      scaleValue = Number(target.getAttribute('data-value'));
    }
    return scaleValue;
  }
}

export default SliderScale;
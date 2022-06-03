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
    this.updateState(state);
    this.update();
  }

  public updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  private init(): void {
    if (this.initOptions.scale) {
      this.createScaleElemets();
      this.createScale();
    }
  }

  private createScaleElemets(): void {
    this.scale = document.createElement('div');
    this.scale.classList.add('slider__scale');
    this.slider.appendChild(this.scale);
    this.scaleValue = document.createElement('div');
    this.scaleValue.classList.add('slider__scale-value');
    this.slider.appendChild(this.scaleValue);
  }

  private createScale(): void{
    const scaleMultiplier = 4;
    const { min, max, orientation } = this.initOptions;
    const sliderSize = max - min;
    const stepCustom = sliderSize / 10;
    const numOfDigits = max.toString().length;

    for (let i = 0; i <= (sliderSize / stepCustom) * scaleMultiplier; i += 1) {
      const elemScale: HTMLElement = document.createElement('div');
      elemScale.classList.add('slider__scale-marker');
      const valueHorizontal = parseFloat((i * stepCustom / scaleMultiplier + min).toFixed(numOfDigits));
      const valueVertical = parseFloat((sliderSize - i * stepCustom / scaleMultiplier + min).toFixed(numOfDigits));
      
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
    this.scale.remove();
    this.scaleValue.remove();
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
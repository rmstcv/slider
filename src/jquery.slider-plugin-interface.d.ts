interface Init {
  min: number,
  max: number,
  step: number,
  setMin: number,
  setMax: number,
  sliderType: 'range' | 'single',
  orientation?: 'vertical' | 'horizontal',
  scale?: boolean,
  toolTip: boolean
}

interface JQuery {
  sliderPlugin(this: JQuery, slider: HTMLElement, options: Init): JQuery;
  setValues: any;
  getValues: any;
  getStep: any;
  setStep: any;
  setOrientation: any;
  setType: any;
  setToolTip: any;
  setScale: any;
}
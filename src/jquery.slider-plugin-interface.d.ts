interface Init {
  min: number,
  max: number,
  step: number,
  setMin: number,
  setMax: number,
  sliderType: 'range' | 'single',
  orientation: 'vertical' | 'horizontal',
  scale: boolean,
  toolTip: boolean
}

interface JQuery {
  sliderPlugin(this: JQuery, slider: HTMLElement, options: Init): JQuery;
  getValues: any;
  setSlider: any;
  getState: any;
}

type Params = Init[keyof Init];

type Actions = 'valueFrom' | 'valueTo' | 'step' | 'type' | 'orientation' | 'scale' | 'toolTip';
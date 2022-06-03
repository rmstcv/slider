interface Init {
  min: number,
  max: number,
  step: number,
  valueFrom: number,
  valueTo: number,
  type: 'range' | 'single',
  orientation: 'vertical' | 'horizontal',
  scale: boolean,
  toolTip: boolean
}

type Params = Init[keyof Init];

type Actions = keyof Init;
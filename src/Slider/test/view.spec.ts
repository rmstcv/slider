import SliderView from '../src/View/sliderView';
import sliderCreater from '../src/View/subViews/sliderCreater';

const init = {
  orientation: 'horizontal' as const,
  sliderType: 'range' as const,
  min: -10,
  max: 10,
  step: 2,
  sliderWidth: 200,
  toolTip: true,
};
let initClone = Object.assign({}, init); 

const slider = document.createElement('div');
sliderCreater(slider);
document.body.appendChild(slider);
let sliderView = new SliderView(slider, initClone);

afterEach(() => {
  initClone = Object.assign({}, init); 
  sliderView = new SliderView(slider, initClone);
});

describe('check progress bar', () => {
  it('progress bar horizontal ', () => {
    sliderView.update([-10, 10]);
    sliderView.currentLowValue = 0;
    sliderView.currentUpperValue = 50;
    sliderView.progressBarHighlight();
    expect(sliderView.progressBar.style.width).toEqual('50%');
    sliderView.initView.orientation = 'vertical';
    sliderView.progressBarHighlight();
    expect(sliderView.progressBar.style.height).toEqual('50%');
  });
});

describe('check type', () => {
  it('check slider type', () => {
    sliderView.checkSliderType();
    expect(sliderView.lower.classList.contains('slider__handle-lower_hidden')).toEqual(false);
    sliderView.initView.sliderType = 'single';
    sliderView.checkSliderType();
    expect(sliderView.lower.classList.contains('slider__handle-lower_hidden')).toEqual(true);
  });
});

describe('check orientation', () => {
  it('check slider orientation', () => {
    sliderView.checkSliderOrientation();
    expect(sliderView.slider.classList.contains('slider_vertical')).toEqual(false);
    sliderView.initView.orientation = 'vertical';
    sliderView.checkSliderOrientation();
    expect(sliderView.slider.classList.contains('slider_vertical')).toBeTruthy();
  });
});

describe('check tooltip', () => {
  it('check slider tooltip', () => {
    init.toolTip = true;
    sliderView.setToolTip();
    expect(sliderView.initView.toolTip).toEqual(false);
    sliderView.setToolTip();
    expect(sliderView.initView.toolTip).toEqual(true);
  });
});

describe('check scale', () => {
  it('checking for scale existence', () => {
    sliderView.createScale();
    expect(document.querySelector('.slider__scale')?.childNodes.length).toBeGreaterThan(0);
  });
});

describe('create scale', () => {
  it('check that the scale changes class', () => {
    sliderView.setScale();
    expect(document.querySelector<HTMLElement>('.slider__scale')!.style.display).toEqual('none');
    sliderView.setScale();
    expect(document.querySelector<HTMLElement>('.slider__scale')!.style.display).toEqual('block');
  });
});

describe('convert to percent', () => {
  it('check converting to percent', () => {
    expect(sliderView.convertToPercent(init.min)).toEqual(0);
    expect(sliderView.convertToPercent(init.max)).toEqual(100);
  });
});

describe('shift left handler', () => {
  it('check left handler shifting', () => {
    sliderView.initView.orientation = 'vertical';
    sliderView.shiftLeftHandler(sliderView.convertToPercent(init.min));
    expect(sliderView.lower.style.top).toEqual('100%');
  });
});

describe('shift right handler', () => {
  it('check right handler shifting', () => {
    sliderView.initView.orientation = 'vertical';
    sliderView.shiftRightHandler(sliderView.convertToPercent(init.max));
    expect(sliderView.upper.style.top).toEqual('0%');
  });
});

describe('values update', () => {
  it('check update', () => {
    sliderView.update([init.min, init.max]);
    expect(sliderView.lower.getAttribute('data-lower')).toEqual(`${init.min}`);
    expect(sliderView.upper.getAttribute('data-upper')).toEqual(`${init.max}`);
  });
});

describe('set orientation', () => {
  it('check set orientation', () => {
    const top = sliderView.lower.style.top;
    sliderView.setOrientation('horizontal');
    expect(sliderView.lower.style.top).toEqual('');
    sliderView.setOrientation('vertical');
    expect(sliderView.lower.style.top).toEqual(top);
  });
});

describe('set type', () => {
  it('check set type', () => {
    sliderView.setType('range');
    expect(sliderView.initView.sliderType).toEqual('range');
  });
});

describe('init', () => {
  it('check init', () => {
    sliderView.init([init.min + init.step, init.max - init.step]);
    expect(sliderView.lower.getAttribute('data-lower')).toEqual(`${init.min + init.step}`);
    expect(sliderView.upper.getAttribute('data-upper')).toEqual(`${init.max - init.step}`);
  });
});
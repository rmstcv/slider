import SliderView from '../src/sliderView';
import sliderCreater from '../src/sliderCreater';

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
    expect(sliderView.lower.style.display).toEqual('block');
    sliderView.initView.sliderType = 'single';
    sliderView.checkSliderType();
    expect(sliderView.lower.style.display).toEqual('none');
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
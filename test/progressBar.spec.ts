import ProgressBar from '../src/Slider/View/subViews/ProgressBar';
/* eslint-disable @typescript-eslint/dot-notation */

const init: Init = {
  min: -10,
  max: 0.0000,
  step: 0.0005,
  valueFrom: -5,
  valueTo: 0.0000,
  type: 'range',
  orientation: 'horizontal',
  scale: true,
  toolTip: true,
};

let progressBar = new ProgressBar(init);
afterEach(() => {
  progressBar = new ProgressBar(init);
});

describe('check update observer', () => {
  it('check update state', () => {
    progressBar.updateObserver({ ...init, min: -20 });
    expect(progressBar['initOptions'].min).toEqual(-20);
  });
  it('check progress bar update horizontal', () => {
    // @ts-ignore
    const spyProgressBar = jest.spyOn(progressBar, 'checkOrientation');
    progressBar.updateObserver(init);
    expect(spyProgressBar).toBeCalled();
    expect(progressBar['progressBar'].style.left).toBe('50%');
    expect(progressBar['progressBar'].style.width).toBe('50%');
  });

  it('check progress bar update vertical', () => {
    progressBar.updateObserver({ ...init, orientation: 'vertical' });
    expect(progressBar['progressBar'].style.top).toBe('0%');
    expect(progressBar['progressBar'].style.height).toBe('50%');
  });
});
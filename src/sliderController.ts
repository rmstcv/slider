import SliderLogic from '../src/sliderLogic';

const init = {
  sliderLength: 400,
  minCoordCustom: 0,
  maxCoordCustom: 100,
};

const sliderLogic = new SliderLogic(init);

export { init, sliderLogic };
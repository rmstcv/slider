import SliderLogic from '../src/sliderLogic';

const init = {
  minCoord: 0,
  maxCoord: 400,
  minCoordCustom: 0,
  maxCoordCustom: 100,
};

const sliderLogic = new SliderLogic(init);

export { init, sliderLogic };
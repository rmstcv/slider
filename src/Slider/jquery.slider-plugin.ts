import $ from 'jquery';
import sliderPresenter from './Presenter/Presenter';
import sliderInitConfig from './sliderInitConfig';

declare global {
  interface JQuery {
    sliderPlugin(this: JQuery<HTMLElement>, slider: HTMLElement, options: UserInit): JQuery;
    setSlider(action: Actions, params: Params): void;
    getState(): Init;
    sliderOnChange(customFunction: () => void): void;
  }
}

$.fn.sliderPlugin = function (this: JQuery<HTMLElement>, slider: HTMLElement, options: UserInit): JQuery { 
  const newOptions = { ...sliderInitConfig, ...options };
  const presenter = new sliderPresenter(slider, newOptions);
  const setSlider = function (action: Actions, params: Params) {
    presenter.setSlider(action, params);
  };
  this.setSlider = setSlider;

  const getState = function () {
    return presenter.getState();
  };
  this.getState = getState;

  const sliderOnChange = function (customFunction: () => void) {
    presenter.onChange(customFunction);
  };
  this.sliderOnChange = sliderOnChange;
  
  return this;
};

function sliderCreate(slider: HTMLElement, newOptions: UserInit) {
  return $(slider).sliderPlugin(slider, newOptions);
}

export default sliderCreate;

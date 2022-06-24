import jQuery from 'jquery';
import sliderPresenter from './Presenter/Presenter';
import sliderInitConfig from './sliderInitConfig';
import './style.scss';

declare global {
  interface JQuery {
    sliderPlugin(this: JQuery<HTMLElement>, options: UserInit): JQuery;
    setSlider(action: Actions, params: Params): void;
    getState(): Init;
    sliderOnChange(customFunction: () => void): void;
  }
}
(function ( $ ) {
  $.fn.sliderPlugin = function (this: JQuery<HTMLElement>, options: UserInit): JQuery { 
    const newOptions = { ...sliderInitConfig, ...options };
    const presenter = new sliderPresenter(this[0], newOptions);
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
})(jQuery);

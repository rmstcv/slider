import SliderPresenter from '../Presenter/sliderPresenter';
import sliderCreater from './subViews/sliderCreater';
import SliderScale from './subViews/sliderScale';
import SliderToolTip from './subViews/sliderToolTip';
import SliderHandlers from './subViews/sliderHandlers';
import sliderProgressBar from './subViews/sliderProgressBar';

type Observers = SliderHandlers | SliderToolTip | SliderScale | sliderProgressBar;

class SliderView {

  private slider: HTMLElement;

  private initView: Init;

  private sliderScale!: SliderScale;

  private sliderToolTip!: SliderToolTip;

  private sliderPresenter: SliderPresenter;

  private sliderHandlers!: SliderHandlers;

  private sliderProgressBar!: sliderProgressBar;

  private observers: Observers[] = [];

  constructor(slider: HTMLElement, presenter: SliderPresenter, initView: Init) {
    this.initView = { ...initView };
    this.slider = slider;
    this.sliderPresenter = presenter;
    this.init();
  }

  public updateView(state: Init): void {
    this.updateState(state);
    this.checkSliderOrientation();
    this.updateObservers(state);
  }

  private subScribe(observer: Observers): void { 
    this.observers.push(observer);
  }

  private subscriber(): void {
    this.subScribe(this.sliderHandlers);
    this.subScribe(this.sliderToolTip);
    this.subScribe(this.sliderScale);
    this.subScribe(this.sliderProgressBar);
  }

  private updateState(state: Init): void {
    this.initView = { ...state };
  }

  private updateObservers(state: Init): void {
    this.observers.forEach((observer) => {   
      observer.updateObserver(state);
    });
  }

  private init(): void {
    sliderCreater(this.slider);
    this.sliderHandlers = new SliderHandlers(this.slider, this.initView);
    this.sliderScale = new SliderScale(this.slider, this.initView);
    this.sliderToolTip = new SliderToolTip(this.slider, this.initView);
    this.sliderProgressBar = new sliderProgressBar(this.slider, this.initView);
    this.subscriber();
    this.checkSliderOrientation();
    this.addListeners();
  }

  private checkSliderOrientation(): void {

    if (this.initView.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical'); 
    } else {
      this.slider.classList.remove('slider_vertical'); 
    }
  }

  private updateHandlers(elem: HTMLElement, e: MouseEvent | TouchEvent): void {
    const [min, max] = this.sliderHandlers.getHandlersCoords(elem, e);
    this.sliderPresenter.changeValues([min, max]);
  }

  private addEvents(elem: HTMLElement, e: MouseEvent | TouchEvent): void {
    e.preventDefault();
    const updateValuesBind = this.updateHandlers.bind(this, elem);
    const actions = [updateValuesBind];
    const removeEvents = function () {
      actions.forEach((action) => {
        document.removeEventListener('mousemove', action);
        document.removeEventListener('touchmove', action);
      }); 
      document.removeEventListener('mouseup', removeEvents);
      document.removeEventListener('touchend', removeEvents);
    };
    actions.forEach((action) => {
      document.addEventListener('mousemove', action);
      document.addEventListener('touchmove', action);
    }); 
    document.addEventListener('mouseup', removeEvents);
    document.addEventListener('touchend', removeEvents);
    document.ondragstart = function () {
      return false;
    };
  }

  private toSubscribeHandlersOnView(): void {
    const [lower, upper] = this.sliderHandlers.getHandlerElems();
    upper.addEventListener('mousedown', (e) => this.addEvents(upper, e));
    lower.addEventListener('mousedown', (e) => this.addEvents(lower, e));
    upper.addEventListener('touchstart', (e) => this.addEvents(upper, e));
    lower.addEventListener('touchstart', (e) => this.addEvents(lower, e));
  }

  private toSubscribeScaleOnView(): void {
    this.slider.addEventListener('click', (e) => {
      const value = this.sliderScale.getScaleValues(e.target as HTMLElement);

      if (value || value === 0) {
        this.sliderPresenter.setSlider('valueTo', value);
        this.sliderPresenter.setSlider('valueFrom', this.initView.min);
      }
    });
  }

  private addListeners(): void {    
    this.toSubscribeHandlersOnView();
    this.toSubscribeScaleOnView();
  }
}

export default SliderView;
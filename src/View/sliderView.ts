import SliderPresenter from '../Presenter/sliderPresenter';
import sliderCreater from './subViews/sliderCreater';
import SliderScale from './subViews/sliderScale';
import SliderToolTip from './subViews/sliderToolTip';
import SliderHandlers from './subViews/sliderHandlers';
import sliderProgressBar from './subViews/sliderProgressBar';

interface Observers {
  updateState(state: Init): void;
  updateObserver(): void,
  sliderHandlers: SliderHandlers,
  sliderToolTip: SliderToolTip,
  sliderScale: SliderScale,
}

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

  private subScribe(observer: any) { 
    this.observers.push(observer);
  }

  private updateObservers() {
    this.observers.forEach((observer) => {   
      observer.updateObserver();
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

  private updateHandlers(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    const [min, max] = this.sliderHandlers.getHandlersCoords(elem, e);
    this.sliderPresenter.changeValues([min, max]);
  }
  
  public updateView(state: Init) {
    this.updateState(state);
    this.checkSliderOrientation();
    this.updateObservers();
  }

  private addEvents(elem: HTMLElement, e: MouseEvent | TouchEvent) {
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

  private addListeners() {    
    this.toSubscribeHandlersOnView();
    this.toSubscribeScaleOnView();
  }

  private toSubscribeHandlersOnView() {
    const [lower, upper] = this.sliderHandlers.getHandlerElems();
    upper.addEventListener('mousedown', (e) => this.addEvents(upper, e));
    lower.addEventListener('mousedown', (e) => this.addEvents(lower, e));
    upper.addEventListener('touchstart', (e) => this.addEvents(upper, e));
    lower.addEventListener('touchstart', (e) => this.addEvents(lower, e));
  }

  private toSubscribeScaleOnView() {
    this.slider.addEventListener('click', (e) => {
      const value = this.sliderScale.getScaleValues(e.target as HTMLElement);

      if (value || value === 0) {
        this.sliderPresenter.setSlider('valueTo', value);
        this.sliderPresenter.setSlider('valueFrom', this.initView.min);
      }
    });
  }

  private subscriber() {
    this.subScribe(this.sliderHandlers);
    this.subScribe(this.sliderToolTip);
    this.subScribe(this.sliderScale);
    this.subScribe(this.sliderProgressBar);
  }

  public updateState(state: Init) {
    this.initView = { ...state };
    this.observers.forEach((observer) => observer.updateState(state));
  }
}

export default SliderView;
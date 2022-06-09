import Presenter from '../Presenter/Presenter';
import Scale from './subViews/Scale';
import ToolTip from './subViews/ToolTip';
import Handlers from './subViews/Handlers';
import ProgressBar from './subViews/ProgressBar';

type Observers = Handlers | ToolTip | Scale | ProgressBar;

class SliderView {
  private rootElem: HTMLElement;

  private slider!: HTMLElement;

  private initOptions: Init;

  private scale!: Scale;

  private toolTip!: ToolTip;

  private presenter: Presenter;

  private handlers!: Handlers;

  private progressBar!: ProgressBar;

  private observers: Observers[] = [];

  private tracker!: HTMLDivElement;

  constructor(rootElem: HTMLElement, presenter: Presenter, initOptions: Init) {
    this.initOptions = { ...initOptions };
    this.rootElem = rootElem;
    this.presenter = presenter;
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
    this.subScribe(this.handlers);
    this.subScribe(this.toolTip);
    this.subScribe(this.scale);
    this.subScribe(this.progressBar);
  }

  private updateState(state: Init): void {
    this.initOptions = { ...state };
  }

  private updateObservers(state: Init): void {
    this.observers.forEach((observer) => {   
      observer.updateObserver(state);
    });
  }

  private createSlider(): void {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    this.slider = slider;
    this.rootElem.appendChild(this.slider);
    const sliderTracker = document.createElement('div');
    sliderTracker.classList.add('slider__tracker');
    this.tracker = sliderTracker;
  }

  private createElements(): void {
    this.handlers = new Handlers(this.tracker, this.initOptions);
    this.toolTip = new ToolTip(this.initOptions);
    this.progressBar = new ProgressBar(this.initOptions);
  }

  private createScale(): void {
    const sliderScale = document.createElement('div');
    sliderScale.classList.add('slider__scale-wrapper');
    this.scale = new Scale(sliderScale, this.initOptions);
    this.slider.appendChild(sliderScale);
  }

  private appendElements(): void {
    const [lowerCountElem, upperCountElem] = this.toolTip.getElems();
    const [lowerElem, upperElem] = this.handlers.getHandlerElems();
    const progressBarElem = this.progressBar.getElems();
    this.slider.appendChild(this.tracker);
    lowerElem.appendChild(lowerCountElem);
    upperElem.appendChild(upperCountElem);
    [lowerElem, upperElem, progressBarElem].forEach((elem) => this.tracker.appendChild(elem));
  }

  private init(): void {
    this.createSlider();
    this.createElements();
    this.appendElements();
    this.createScale();
    this.subscriber();
    this.checkSliderOrientation();
    this.addListeners();
  }

  private checkSliderOrientation(): void {

    if (this.initOptions.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical'); 
    } else {
      this.slider.classList.remove('slider_vertical'); 
    }
  }

  private updateHandlers(elem: HTMLElement, e: MouseEvent | TouchEvent): void {
    const [min, max] = this.handlers.getHandlersCoords(elem, e);
    this.presenter.changeValues([min, max]);
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
    const [lower, upper] = this.handlers.getHandlerElems();
    upper.addEventListener('mousedown', (e) => this.addEvents(upper, e));
    lower.addEventListener('mousedown', (e) => this.addEvents(lower, e));
    upper.addEventListener('touchstart', (e) => this.addEvents(upper, e));
    lower.addEventListener('touchstart', (e) => this.addEvents(lower, e));
  }

  private toSubscribeScaleOnView(): void {
    this.slider.addEventListener('click', (e) => {
      const value = this.scale.getScaleValues(e.target as HTMLElement);

      if (value || value === 0) {
        this.presenter.setSlider('valueTo', value);
        this.presenter.setSlider('valueFrom', this.initOptions.min);
      }
    });
  }

  private addListeners(): void {    
    this.toSubscribeHandlersOnView();
    this.toSubscribeScaleOnView();
  }
}

export default SliderView;
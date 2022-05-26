import SliderController from '../Controller/sliderController';
import sliderCreater from './subViews/sliderCreater';
import SliderScale from './subViews/sliderScale';
import SliderToolTip from './subViews/sliderToolTip';
import SliderHandlers from './subViews/sliderHandlers';
import searchElem from '../searchElem';

interface Observers {
  updateObserver(): void,
  sliderHandlers: SliderHandlers,
  sliderToolTip: SliderToolTip,
  sliderScale: SliderScale,
}

class SliderView {

  private slider: HTMLElement;

  private progressBar!: HTMLElement;

  private initView: Init;

  private sliderScale!: SliderScale;

  private sliderToolTip!: SliderToolTip;

  sliderController: SliderController;

  private sliderHandlers!: SliderHandlers;

  private observers: Observers[];

  constructor(slider: HTMLElement, controller: SliderController, initView: Init) {
    this.observers = [];
    this.initView = initView;
    this.slider = slider;
    this.sliderController = controller;
    this.init();
  }


  private subScribe(observer: any) { 
    this.observers.push(observer);
  }

  private update() {
    this.observers.forEach((observer: { updateObserver: () => void; }) => {   
      observer.updateObserver();
    });
  }

  private init(): void {
    sliderCreater(this.slider);
    this.sliderHandlers = new SliderHandlers(this.slider, this.initView);
    this.sliderScale = new SliderScale(this.slider, this.initView);
    this.sliderToolTip = new SliderToolTip(this.slider, this.initView);
    this.searchElems();
    
    this.subscriber();
    this.checkSliderOrientation();
    this.updateView();
    this.addListeners();
  }

  private searchElems(): void {
    this.progressBar = searchElem('.slider__highlight', this.slider) as HTMLElement;
  }

  private progressBarUpdate(): void {
    const [min, max]: number[] = [this.initView.setMin, this.initView.setMax];
    const [minPercent, maxPercent] = [this.convertToPercent(min), this.convertToPercent(max)];
    const progressLength = maxPercent - minPercent; 

    if (this.initView.orientation === 'horizontal') {

      if ( progressLength >= 0 ) {
        this.progressBar.style.width = progressLength + '%';
        this.progressBar.style.left = minPercent + '%';
      }
    }

    if (this.initView.orientation === 'vertical') {

      if ( progressLength >= 0 ) {
        this.progressBar.style.height = progressLength + '%';
        this.progressBar.style.top = 100 - maxPercent + '%';
      }
    }
  } 

  private checkSliderOrientation(): void {
    if (this.initView.orientation === 'vertical') {
      this.slider.classList.add('slider_vertical'); 
    } else {
      this.slider.classList.remove('slider_vertical'); 
    }
  }

  public setToolTip(): void {
    this.sliderToolTip.setToolTip();
  }

  public setType(): void {
    this.sliderHandlers.checkType();
  }

  public setScale(): void {
    this.sliderScale.update();
  }

  convertToPercent(customValue: number) {
    const valuePercent = (100 / Math.abs(this.initView.max - this.initView.min)) * (-this.initView.min + customValue);
    return valuePercent;
  }

  updateHandlers(elem: HTMLElement, e: MouseEvent | TouchEvent) {
    const [min, max] = this.sliderHandlers.getHandlersCoords(elem, e);
    
    this.sliderController.updateSlider([min, max]);
  }
  
  updateView() { 
    this.updater();
    this.progressBarUpdate();
  }

  setOrientation() {
    if (this.initView.orientation === 'vertical') {
      this.progressBar.style.width = '';
      this.progressBar.style.left = '';
    } else {
      this.progressBar.style.height = '';
      this.progressBar.style.top = '';
    }
    this.updateView();
    this.checkSliderOrientation();
    this.sliderHandlers.checkOrientation();
    // this.sliderScale.update();
  }


  addEvents(elem: HTMLElement, e: MouseEvent | TouchEvent) {
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

  addListeners() {    
    this.toSubscribeHandlersOnView();
    this.toSubscribeScaleOnView();
  }

  toSubscribeHandlersOnView() {
    const [lower, upper] = this.sliderHandlers.getHandlerElems();
    upper.addEventListener('mousedown', (e) => this.addEvents(upper, e));
    lower.addEventListener('mousedown', (e) => this.addEvents(lower, e));
    upper.addEventListener('touchstart', (e) => this.addEvents(upper, e));
    lower.addEventListener('touchstart', (e) => this.addEvents(lower, e));
  }

  toSubscribeScaleOnView() {
    const scaleElem = this.sliderScale.getScaleElem(); 
    scaleElem.addEventListener('click', (e) => {
      const value = this.sliderScale.getScaleValues(e.target as HTMLElement);
    
      if (value !== undefined) this.sliderController.updateSliderFromScale(value);
    });
  }

  subscriber() {
    this.subScribe(this.sliderHandlers);
    this.subScribe(this.sliderToolTip);
    this.subScribe(this.sliderScale);
  }

  updater() {
    this.update();
  }
}

export default SliderView;
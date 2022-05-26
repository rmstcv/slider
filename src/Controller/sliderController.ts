import SliderModel from '../Model/sliderModel';
import SliderView from '../View/sliderView';

interface InitController {
  min: number,
  max: number,
  step: number,
  setMin: number,
  setMax: number,
  sliderType: 'range' | 'single',
  orientation: 'vertical' | 'horizontal',
  scale: boolean,
  toolTip: boolean
}

class SliderController {

  private initController: InitController;

  private sliderModel: SliderModel;

  private sliderView: SliderView;

  constructor(slider: HTMLElement, initController: InitController) {
    this.initController = initController;
    this.sliderModel = new SliderModel(initController);
    this.sliderView = new SliderView(slider, this, initController);
    this.init();
  }

  updateSlider([min, max]: number[]) {
    this.sliderModel.updateValues([min, max]); 
    this.sliderView.updateView();
  }

  updateSliderFromScale(value: number) {
    this.sliderModel.setValues([this.initController.min, value]);
    this.sliderView.updateView();
  }

  getModelValues() {
    let [min, max] = this.sliderModel.getValues();
    const pow = this.initController.max.toString().length;
    min =  Math.round((min) * Math.pow(10, pow)) / Math.pow(10, pow);
    max =  Math.round((max) * Math.pow(10, pow)) / Math.pow(10, pow);
    return [min, max];
  }

  setModelValues([min, max]: number[]) {
    this.sliderModel.setValues([min, max]); 
    this.sliderView.updateView();
  }

  setStep(step: number) {
    return this.sliderModel.setStep(step);
  }

  setOrientation(orientation: 'vertical' | 'horizontal') {
    this.initController.orientation = orientation;
    this.sliderView.setOrientation();
  }

  setType(type: 'range' | 'single') {
    this.setModelValues([this.initController.min, this.getModelValues()[1]]);
    this.initController.sliderType = type;
    this.sliderView.setType();
  }

  setToolTip() {
    this.initController.toolTip = this.initController.toolTip ? false : true;
    this.sliderView.setToolTip();
  }

  setScale() {
    this.initController.scale = this.initController.scale ? false : true;
    this.sliderView.setScale();
  }

  private init(): void {
    this.sliderModel.init([this.initController.setMin, this.initController.setMax]);
  }
}

export default SliderController;
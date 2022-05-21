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
    this.sliderModel = new SliderModel({
      sliderMin: this.initController.min,
      sliderMax: this.initController.max,
      step: this.initController.step,
    });
    this.sliderView = new SliderView(slider, this, initController);
    this.init();
  }

  // checkStep(step: number) {
  //   let newStep = step;
  //   if (step <= 0 || step >= Math.abs(this.initController.max - this.initController.min) || !step) {
  //     newStep = (Math.abs(this.initController.max - this.initController.min)) / 20;
  //   }
  //   return newStep;
  // }

  updateSlider([min, max]: number[]) {
    const [left, right] = this.sliderModel.updateValues([min, max]); 
    this.sliderView.update([left, right]);
  }

  updateSliderFromScale(value: number) {
    this.sliderView.update([this.initController.min, value]);
    this.sliderModel.setValues([this.initController.min, value]);
  }

  getModelValues() {
    let [min, max] = this.sliderModel.getValues();
    const pow = this.initController.max.toString().length;
    min =  Math.round((min) * Math.pow(10, pow)) / Math.pow(10, pow);
    max =  Math.round((max) * Math.pow(10, pow)) / Math.pow(10, pow);
    return [min, max];
  }

  setModelValues([min, max]: number[]) {
    const [left, right] = this.sliderModel.setValues([min, max]); 
    this.sliderView.update([left, right]);
  }

  setStep(step: number) {
    return this.sliderModel.setStep(step);
  }

  setOrientation(orientation: 'vertical' | 'horizontal') {
    this.initController.orientation = orientation;
    this.sliderView.initView.orientation = orientation;
    this.sliderView.setOrientation(orientation);
  }

  setType(type: 'range' | 'single') {
    this.setModelValues([this.initController.min, this.getModelValues()[1]]);
    this.initController.sliderType = type;
    this.sliderView.setType(type);
  }

  setToolTip() {
    if (this.initController.toolTip) {
      this.initController.toolTip = false;
    } else {
      this.initController.toolTip = true;
    }
    this.sliderView.setToolTip();
  }

  setScale() {
    if (this.initController.scale) {
      this.initController.scale = false;
    } else {
      this.initController.scale = true;
    }
    this.sliderView.setScale();
  }

  private init(): void {
    this.sliderModel.init([this.initController.setMin, this.initController.setMax]);
  }
}

export default SliderController;


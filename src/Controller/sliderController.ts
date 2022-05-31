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
    this.initController = { ...initController };
    this.sliderModel = new SliderModel(initController);
    this.sliderView = new SliderView(slider, this, initController);
    this.init();
  }

  updateState(state: Init) {
    this.initController = { ...state };
  }

  setSlider(action: Actions, params: Params) {
    if (action === 'valueFrom' ) {
      this.setValueFrom(<number>params);
    }
    if (action === 'valueTo') {
      this.setValueTo(<number>params);
    }
    if (action === 'step') {
      this.setStep(<number>params);
    }
    if (action === 'type') {
      this.setType(<'range' | 'single'>params);
    }
    if (action === 'orientation') {
      this.setOrientation(<Init['orientation']>params);
    }
    if (action === 'scale') {
      this.setScale(<boolean>params);
    }
    if (action === 'toolTip') {
      this.setToolTip(<boolean>params);
    }
  }

  setValueFrom(params: number) {
    this.sliderModel.setValueFrom(params);
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.updateView();
  }

  setValueTo(params: number) {
    this.sliderModel.setValueTo(params);
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.updateView();
  }

  setStep(step: number) {
    this.sliderModel.setStep(step);
    this.sliderView.updateState(this.sliderModel.getState());
  }

  updateSlider([min, max]: number[]) {
    this.sliderModel.updateValues([min, max]);
    this.updateState(this.sliderModel.getState());
    this.sliderView.updateState(this.sliderModel.getState());
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
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.updateView();
  }

  setOrientation(orientation: Init['orientation']) {
    this.sliderModel.state.orientation = orientation;
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.updateView();
  }

  setType(type: 'range' | 'single') {
    this.sliderModel.state.sliderType = type;
    this.setModelValues([this.initController.min, this.getModelValues()[1]]);
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.setType();
  }

  setToolTip(toolTip: boolean) {
    this.sliderModel.state.toolTip = toolTip;
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.setToolTip();
  }

  setScale(scale: boolean) {
    this.sliderModel.state.scale = scale;
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.setScale();
  }

  private init(): void {
    this.sliderModel.init([this.initController.setMin, this.initController.setMax]);
  }

  getState(): Init { 
    return this.sliderModel.getState();
  }
}

export default SliderController;
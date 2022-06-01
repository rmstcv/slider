import SliderModel from '../Model/sliderModel';
import SliderView from '../View/sliderView';

class SliderPresenter {

  readonly initPresenter: Init;

  private sliderModel: SliderModel;

  private sliderView: SliderView;

  constructor(slider: HTMLElement, initPresenter: Init) {
    this.initPresenter = { ...initPresenter };
    this.sliderModel = new SliderModel(initPresenter);
    this.sliderView = new SliderView(slider, this, initPresenter);
  }

  public setSlider(action: Actions, params: Params): void {
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
      this.setType(<Init['sliderType']>params);
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

  public getState(): Init { 
    return this.sliderModel.getState();
  }

  public updateSlider([min, max]: number[]): void {
    this.sliderModel.updateValues([min, max]);
    this.updateView();
  }

  public setModelValues([min, max]: number[]): void {
    this.sliderModel.setValues([min, max]); 
    this.updateView();
  }

  private updateView(): void {
    const state = this.sliderModel.getState();
    this.sliderView.updateView(state);
  }

  private setValueFrom(params: number): void {
    this.sliderModel.setValueFrom(params);
    this.updateView();
  }

  private setValueTo(params: number): void {
    this.sliderModel.setValueTo(params);
    this.updateView();
  }

  private setStep(step: number): void {
    this.sliderModel.setStep(step);
    this.sliderView.updateState(this.sliderModel.getState());
  }

  private setOrientation(orientation: Init['orientation']): void {
    this.sliderModel.state.orientation = orientation;
    this.updateView();
  }

  private setType(type: 'range' | 'single'): void {
    const { min } = this.sliderModel.getState();
    this.sliderModel.state.sliderType = type;
    this.setValueFrom(min);
    this.sliderView.setType();
  }

  private setToolTip(toolTip: boolean): void {
    this.sliderModel.state.toolTip = toolTip;
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.setToolTip();
  }

  private setScale(scale: boolean): void {
    this.sliderModel.state.scale = scale;
    this.sliderView.updateState(this.sliderModel.getState());
    this.sliderView.setScale();
  }
}

export default SliderPresenter;
import SliderModel from '../Model/sliderModel';
import SliderView from '../View/sliderView';

class SliderPresenter {

  private sliderModel: SliderModel;

  private sliderView: SliderView;

  constructor(slider: HTMLElement, stateInit: Init) {
    this.sliderModel = new SliderModel(stateInit);
    this.sliderView = new SliderView(slider, this, this.getState());
  }

  public changeValues([min, max]: number[]): void {
    this.sliderModel.changeValues([min, max]);
    this.updateView();
  }

  public setSlider(action: Actions, params: Params): void {
    this.sliderModel.setState(action, params);
    this.updateView();
  }

  private updateView(): void {
    const state = this.sliderModel.getState();
    this.sliderView.updateView(state);
  }

  public getState(): Init { 
    return this.sliderModel.getState();
  }
}

export default SliderPresenter;
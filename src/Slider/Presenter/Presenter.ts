import Model from '../Model/Model';
import View from '../View/View';

class SliderPresenter {

  private model: Model;

  private view: View;

  constructor(slider: HTMLElement, stateInit: Init) {
    this.model = new Model(stateInit);
    this.view = new View(slider, this, this.getState());
  }

  public changeValues([min, max]: number[]): void {
    this.model.changeValues([min, max]);
    this.updateView();
  }

  public setSlider(action: Actions, params: Params): void {
    this.model.setState(action, params);
    this.updateView();
  }

  private updateView(): void {
    const state = this.model.getState();
    this.view.updateView(state);
  }

  public getState(): Init { 
    return this.model.getState();
  }
}

export default SliderPresenter;
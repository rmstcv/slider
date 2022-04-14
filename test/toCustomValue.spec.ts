import ToCustomValue from '../src/toCustomValue';

const sliderLength = 200;
const customLength = 100;
const slider = document.createElement('div');
slider.style.width = '200';
const toCustomValue = new ToCustomValue(slider, sliderLength, 'horizontal');

describe('value display', () => {
  it('value', () => {
    const valuesCustom = toCustomValue.getValuesCustom([0, sliderLength]);
    expect(valuesCustom).toEqual([0, customLength]);
  });
  it('value', () => {
    expect(toCustomValue.convertFromCustom(customLength)).toEqual(sliderLength);
  });
  it('value', () => {
    expect(toCustomValue.convertToCustom(sliderLength)).toEqual(customLength);
  });
});
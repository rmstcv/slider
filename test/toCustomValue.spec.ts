import ToCustomValue from '../src/toCustomValue';

const sliderLength = 200;
const customLength = 100;
const toCustomValue = new ToCustomValue(sliderLength, customLength);

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
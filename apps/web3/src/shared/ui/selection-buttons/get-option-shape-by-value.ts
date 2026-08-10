export function getButtonShapeByValue(optionValue: string) {
  return optionValue === 'UP' || optionValue === 'TP'
    ? 'cutted-left'
    : optionValue === 'DOWN' || optionValue === 'SL'
    ? 'cutted-right'
    : 'cutted-both'
}

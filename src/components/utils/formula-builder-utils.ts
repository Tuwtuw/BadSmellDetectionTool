import { expression, operator, isExpression } from '../formula-builder';

export const getVisualRepresentationFromFormula = (formula: (operator | expression)[]) => {
  if (!formula) return '';
  let visualRepresentation = '';
  formula.forEach((formulaElement) => {
    if (isExpression(formulaElement)) {
      visualRepresentation +=
        '{' + formulaElement.metric.name + '}' + ' ' + formulaElement.comparison + ' ' + formulaElement.comparisonValue;
    } else {
      formulaElement.value === '!'
        ? (visualRepresentation += ' ' + formulaElement.value)
        : (visualRepresentation += ' ' + formulaElement.value + ' ');
    }
  });
  return visualRepresentation;
};

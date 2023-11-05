import { Tooltip } from 'antd';
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

export const getVisualRepresentationWithTooltipValuesFromFormula = (
  formula: (operator | expression)[],
  metrics: Map<string, number | boolean>,
): React.ReactNode => {
  if (!formula) return '';

  return formula.map((formulaElement) => {
    if (isExpression(formulaElement)) {
      console.log(metrics.get(formulaElement.metric.metric_input_id));
      return (
        <span>
          <Tooltip title={metrics.get(formulaElement.metric.metric_input_id)}>
            {'{' + formulaElement.metric.name + '}'}
          </Tooltip>
          {` ${formulaElement.comparison} ${formulaElement.comparisonValue}`}
        </span>
      );
    } else {
      return formulaElement.value === '!' ? ' ' + formulaElement.value : ' ' + formulaElement.value + ' ';
    }
  });
};

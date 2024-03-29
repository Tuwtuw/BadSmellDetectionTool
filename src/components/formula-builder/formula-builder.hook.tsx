import React from 'react';

import { FormulaBuilderProps } from './formula-builder';
import { getVisualRepresentationFromFormula } from '../utils/formula-builder-utils';
import { Metric } from '../../logic/types';

export interface expression {
  metric: Omit<Metric, 'description'>;
  comparison: string;
  comparisonValue: number;
}

export interface operator {
  value: '&&' | '||' | '!' | '(' | ')';
}

function useFormulaBuilderHook(props: FormulaBuilderProps) {
  const [selectedMetric, setSelectedMetric] = React.useState<Metric>(undefined);
  const [comparison, setComparison] = React.useState(undefined);
  const [comparisonValue, setComparisonValue] = React.useState(undefined);
  const [parenthesisStack, setParenthesisStack] = React.useState([]);

  const { value, onChange } = props;

  const [finalFormula, setFinalFormula] = React.useState<(expression | operator)[]>(value ?? []);

  const addComparison = () => {
    // Only add if not null
    if (!selectedMetric || !comparison || comparisonValue === undefined) return;
    const lastFormulaElement = finalFormula.slice(-1).pop();

    if (finalFormula.length === 0 || (!isExpression(lastFormulaElement) && lastFormulaElement.value !== ')')) {
      const newComparison: expression = {
        metric: {
          metric_id: selectedMetric.metric_id,
          name: selectedMetric.name,
          type: selectedMetric.type,
          metric_input_id: selectedMetric.metric_input_id,
        },
        comparison: comparison,
        comparisonValue: comparisonValue,
      };

      setFinalFormula([...finalFormula, newComparison]);
      onChange?.([...finalFormula, newComparison]);
    }
  };

  const addOperator = (operator: string) => {
    const lastFormulaElement = finalFormula.slice(-1).pop();

    if (finalFormula.length === 0) {
      if (operator === '!' || operator === '(') setFinalFormula([...finalFormula, { value: operator }]);
    } else {
      if (
        (operator === '&&' || operator === '||') &&
        (isExpression(lastFormulaElement) || lastFormulaElement.value === ')')
      ) {
        setFinalFormula([...finalFormula, { value: operator }]);
        onChange?.([...finalFormula, { value: operator }]);
      }
      if (operator === '!' && !isExpression(lastFormulaElement) && lastFormulaElement.value !== ')') {
        setFinalFormula([...finalFormula, { value: operator }]);
        onChange?.([...finalFormula, { value: operator }]);
      }
      if (operator === '(' && !isExpression(lastFormulaElement) && lastFormulaElement.value !== ')') {
        setFinalFormula([...finalFormula, { value: operator }]);
        onChange?.([...finalFormula, { value: operator }]);
        setParenthesisStack([...parenthesisStack, '(']);
      }
      if (operator === ')' && parenthesisStack.length > 0 && isExpression(lastFormulaElement)) {
        setFinalFormula([...finalFormula, { value: operator }]);
        onChange?.([...finalFormula, { value: operator }]);
        setParenthesisStack(parenthesisStack.slice(0, -1));
      }
    }
  };

  const onClear = () => {
    setFinalFormula([]);
    onChange?.([]);
  };

  const onDelete = () => {
    const lastFormulaElement = finalFormula.slice(-1).pop();
    if (lastFormulaElement) {
      if (!isExpression(lastFormulaElement)) {
        if (lastFormulaElement.value === '(') {
          setParenthesisStack(parenthesisStack.slice(0, -1));
        } else if (lastFormulaElement.value === ')') {
          setParenthesisStack([...parenthesisStack, '(']);
        }
      }
      setFinalFormula(finalFormula.slice(0, -1));
    }
    onChange?.(finalFormula.slice(0, -1));
  };

  const visualRepresentation = React.useMemo<string>(() => {
    return getVisualRepresentationFromFormula(finalFormula);
  }, [finalFormula]);

  const isFormulaValid = React.useMemo<boolean>(() => {
    if (finalFormula.length === 0) return false;
    const lastFormulaElement = finalFormula.slice(-1).pop();
    return parenthesisStack.length === 0 && (isExpression(lastFormulaElement) || lastFormulaElement.value === ')');
  }, [parenthesisStack, finalFormula]);

  return {
    selectedMetric,
    setSelectedMetric,
    comparison,
    setComparison,
    comparisonValue,
    setComparisonValue,
    addComparison,
    addOperator,
    finalFormula,
    visualRepresentation,
    onClear,
    onDelete,
  };
}

export function isExpression(value: expression | operator): value is expression {
  return (value as expression).comparison !== undefined;
}

export default useFormulaBuilderHook;

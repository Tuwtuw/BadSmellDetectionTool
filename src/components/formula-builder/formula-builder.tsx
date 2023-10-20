import React, { memo, ReactNode } from 'react';

import useFormulaBuilderHook, { expression, operator } from './formula-builder.hook';
import * as styled from './formula-builder.styles';
import { Button, InputNumber, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Metric } from '../../logic/types';

export interface FormulaBuilderProps {
  /*
   * Defines component's children
   */
  children?: ReactNode;
  /*
   * Defines custom className
   */
  className?: string;
  /*
   * Defines component's custom style
   */
  style?: React.CSSProperties;
  /*
   * List of Metrics to be displayed.
   */
  metricsList: metricsListOptions[];
  /*
   * Initial Formula
   */
  initialValue?: string;
  /*
   * Initial Formula
   */
  value?: (expression | operator)[];
  /*
   * Initial Formula
   */
  onChange?: (newValue: (expression | operator)[]) => void;
}

interface metricsListOptions {
  value: number;
  metric: Metric;
  label: string;
}

function FormulaBuilder(props: FormulaBuilderProps) {
  const { metricsList, className, style } = props;

  const {
    setComparison,
    setComparisonValue,
    setSelectedMetric,
    addComparison,
    addOperator,
    visualRepresentation,
    onClear,
    onDelete,
  } = useFormulaBuilderHook(props);

  return (
    <styled.FormulaBuilder className={`${className ?? ''}`.trim()} style={style}>
      <styled.Expression>
        <Select
          options={metricsList}
          placeholder="Metric"
          showSearch
          optionFilterProp="label"
          onChange={(value, option) => {
            setSelectedMetric(Array.isArray(option) ? option[0].metric : option.metric);
            console.log(option);
          }}
        />
        <Select
          options={[
            { value: '===', label: '===' },
            { value: '>', label: '>' },
            { value: '<', label: '<' },
            { value: '>=', label: '>=' },
            { value: '<=', label: '<=' },
          ]}
          onChange={(value) => setComparison(value)}
          style={{ flexBasis: '20%' }}
        />
        <InputNumber onChange={(value) => setComparisonValue(value)} />
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={addComparison} style={{ flexBasis: '15%' }} />
      </styled.Expression>
      <styled.Operators>
        <Button type="primary" onClick={() => addOperator('&&')}>
          AND
        </Button>
        <Button type="primary" onClick={() => addOperator('||')}>
          OR
        </Button>
        <Button type="primary" onClick={() => addOperator('!')}>
          NOT
        </Button>
        <Button type="primary" onClick={() => addOperator('(')}>
          (
        </Button>
        <Button type="primary" onClick={() => addOperator(')')}>
          )
        </Button>
      </styled.Operators>
      <styled.Result>
        <TextArea rows={4} disabled value={visualRepresentation} />
      </styled.Result>
      <styled.Controls>
        <Button type="primary" onClick={onDelete}>
          Delete
        </Button>
        <Button type="primary" onClick={onClear}>
          Clear
        </Button>
      </styled.Controls>
    </styled.FormulaBuilder>
  );
}

export default memo(FormulaBuilder) as unknown as typeof FormulaBuilder;

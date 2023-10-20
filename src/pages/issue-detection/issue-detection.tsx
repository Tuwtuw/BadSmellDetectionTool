import React, { memo, ReactNode, useState } from 'react';
import type { CascaderProps } from 'antd';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';

import useIssueDetectionHook from './issue-detection.hook';
import * as styled from './issue-detection.styles';
import FormulaBuilder from '../../components/formula-builder';

export interface IssueDetectionProps {
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
}

function IssueDetection(props: IssueDetectionProps) {
  const { children, className, style } = props;

  const { count, increment, decrement } = useIssueDetectionHook(props);

  return (
    <styled.IssueDetection className={`${className ?? ''}`.trim()} style={style}>
      <FormulaBuilder></FormulaBuilder>
    </styled.IssueDetection>
  );
}

export default memo(IssueDetection) as unknown as typeof IssueDetection;

import React, { memo, ReactNode } from 'react';

import useMethodAnalysisDetailsHook from './method-analysis-details.hook';
import * as styled from './method-analysis-details.styles';
import { ClassMethodWithName } from '../file-analysis-detail.hook';
import { BadSmell, Metric } from '../../../../logic/types';
import { Collapse } from 'antd';

export interface MethodAnalysisDetailsProps {
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
   * File which is current in analysis
   */
  methodInAnalysis: ClassMethodWithName;
  /*
   * Id of issues which are current in analysis
   */
  issuesInAnalysis: BadSmell[];
  /*
   * Id of issues which are current in analysis
   */
  metrics: Metric[];
}

function MethodAnalysisDetails(props: MethodAnalysisDetailsProps) {
  const { className, style } = props;

  const { collapseItems } = useMethodAnalysisDetailsHook(props);

  return (
    <styled.MethodAnalysisDetails className={`${className ?? ''}`.trim()} style={style}>
      <Collapse accordion items={collapseItems} />
    </styled.MethodAnalysisDetails>
  );
}

export default memo(MethodAnalysisDetails) as unknown as typeof MethodAnalysisDetails;

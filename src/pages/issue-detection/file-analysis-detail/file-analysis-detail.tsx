import React, { memo, ReactNode } from 'react';

import useFileAnalysisDetailHook from './file-analysis-detail.hook';
import * as styled from './file-analysis-detail.styles';
import { Button, Select, Typography, Collapse } from 'antd';
import { MetricsFileWithName } from '../issue-detection.hook';

export interface FileAnalysisDetailProps {
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
  fileInAnalysis: MetricsFileWithName;
  /*
   * Id of issues which are current in analysis
   */
  idOfIssuesInAnalysis: number[];
  /*
   * Callback for when return button is clicked
   */
  onReturnClick?: () => void;
}

function FileAnalysisDetail(props: FileAnalysisDetailProps) {
  const { fileInAnalysis, onReturnClick, className, style } = props;

  const { Title } = Typography;

  const { setSelectedClass, classesList, collapseItems } = useFileAnalysisDetailHook(props);

  return (
    <styled.FileAnalysisDetail className={`${className ?? ''}`.trim()} style={style}>
      <div>
        <Button
          onClick={() => {
            onReturnClick?.();
          }}
        >
          Return
        </Button>
        <div className="header">
          <Title level={2}>{fileInAnalysis.fileName}</Title>
        </div>
        <div style={{ width: '100%' }}>
          <Select
            options={classesList}
            onChange={(value, option) => {
              setSelectedClass(Array.isArray(option) ? option[0].class : option.class);
            }}
          />
        </div>
        <div>
          <Collapse accordion items={collapseItems} />
        </div>
      </div>
    </styled.FileAnalysisDetail>
  );
}

export default memo(FileAnalysisDetail) as unknown as typeof FileAnalysisDetail;

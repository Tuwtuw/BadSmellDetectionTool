import React from 'react';

import { MethodAnalysisDetailsProps } from './method-analysis-details';
import { BadSmell } from '../../../../logic/types';
import Table, { ColumnsType } from 'antd/es/table';
import { CollapseProps, Divider, Typography } from 'antd';
import { getVisualRepresentationWithTooltipValuesFromFormula } from '../../../../components/utils/formula-builder-utils';
import { CheckOutlined } from '@ant-design/icons';

function useMethodAnalysisDetailsHook(props: MethodAnalysisDetailsProps) {
  const { methodInAnalysis, issuesInAnalysis, metrics } = props;

  const metricsTableColumns: ColumnsType<{ metricName: string; metricValue: number | boolean }> = [
    {
      title: 'Metric',
      key: 'metricname',
      dataIndex: 'metricName',
      sorter: (a, b) => a.metricName.localeCompare(b.metricName),
    },
    {
      title: 'Value',
      key: 'metricvalue',
      dataIndex: 'metricValue',
      align: 'center',
      sorter: (a, b) => Number(a.metricValue) - Number(b.metricValue),
    },
  ];

  const issuesTableColumns: ColumnsType<{ issue: BadSmell; issueResult: boolean }> = [
    {
      title: 'Issue',
      key: 'issuename',
      render: (_, record) => record.issue.name,
      sorter: (a, b) => a.issue.name.localeCompare(b.issue.name),
    },
    {
      title: 'Detected',
      key: 'issueResult',
      render: (_, record) => <span>{record.issueResult && <CheckOutlined />}</span>,
      align: 'center',
      sorter: (a, b) => Number(a.issueResult) - Number(b.issueResult),
    },
  ];

  const methodMetricsList = React.useMemo(() => {
    if (!methodInAnalysis) return [];
    const metricsList = [];
    for (const [metricId, metricValue] of methodInAnalysis.metrics) {
      const metric = metrics.find((item) => item.metric_input_id === metricId);
      if (metric) {
        metricsList.push({ metricName: metric.name, metricValue });
      }
    }
    return metricsList;
  }, [methodInAnalysis]);

  const classIssuesList = React.useMemo(() => {
    if (!methodInAnalysis || !methodInAnalysis.issuesAnalysed) return [];
    const issuesList = [];
    for (const [issueId, issueResult] of methodInAnalysis.issuesAnalysed) {
      const issue = issuesInAnalysis.find((element) => element.badSmell_id === issueId);
      if (issue) {
        issuesList.push({ issue, issueResult });
      }
    }
    return issuesList;
  }, [methodInAnalysis]);

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: <Typography.Text strong>Metrics</Typography.Text>,
      children: (
        <Table
          dataSource={methodMetricsList}
          columns={metricsTableColumns}
          rowKey={(record) => String(record.metricName)}
          bordered
          pagination={{ position: ['bottomCenter'] }}
        />
      ),
    },
    {
      key: '2',
      label:
        methodInAnalysis && methodInAnalysis.methodHasIssues ? (
          <Typography.Text strong type="danger">
            Issues Analysis
          </Typography.Text>
        ) : (
          <Typography.Text strong>Issues Analysis</Typography.Text>
        ),
      children: (
        <Table
          dataSource={classIssuesList}
          columns={issuesTableColumns}
          rowKey={(record) => String(record.issue.name)}
          bordered
          expandable={{
            expandedRowRender: (record) => {
              return (
                <div>
                  <Typography.Text strong>Formula</Typography.Text>
                  <p style={{ margin: 0 }}>
                    {getVisualRepresentationWithTooltipValuesFromFormula(
                      record.issue.detectionStrategy.formula,
                      methodInAnalysis.metrics,
                    )}
                  </p>
                  <Divider />
                  <small>*Hover over metrics to see their values</small>
                </div>
              );
            },
          }}
          pagination={{ position: ['bottomCenter'] }}
        />
      ),
    },
  ];

  return {
    collapseItems,
  };
}

export default useMethodAnalysisDetailsHook;

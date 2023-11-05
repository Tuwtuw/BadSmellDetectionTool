import React from 'react';

import { FileAnalysisDetailProps } from './file-analysis-detail';
import { BadSmell, ClassMethod, FileClass, Metric } from '../../../logic/types';
import Table, { ColumnsType } from 'antd/es/table';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Space, CollapseProps, Typography, Divider } from 'antd';
import { getVisualRepresentationWithTooltipValuesFromFormula } from '../../../components/utils/formula-builder-utils';
import MethodAnalysisDetails from './method-analysis-details';

export interface ClassMethodWithName extends ClassMethod {
  methodName: string;
}

function useFileAnalysisDetailHook(props: FileAnalysisDetailProps) {
  const { fileInAnalysis, idOfIssuesInAnalysis } = props;
  const [selectedClass, setSelectedClass] = React.useState<FileClass>();
  const [issuesInAnalysis, setIssuesInAnalysis] = React.useState<BadSmell[]>();
  const [metrics, setMetrics] = React.useState<Metric[]>();

  React.useEffect(() => {
    window.api.database.badSmell.fetchFromId(idOfIssuesInAnalysis).then(
      (data) => {
        setIssuesInAnalysis(data);
      },
      (error) => {
        console.error(error);
      },
    );

    window.api.database.metric.fetchAll().then(
      (data) => {
        setMetrics(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const classesList = React.useMemo(() => {
    if (!fileInAnalysis) return [];
    const classesInFile = [];
    for (const [className, classObject] of fileInAnalysis.classes) {
      const label = classObject.classHasIssues ? (
        <Typography.Text strong type="danger">
          {className} <ExclamationCircleOutlined />
        </Typography.Text>
      ) : (
        <span>{className}</span>
      );
      classesInFile.push({ label, value: className, class: classObject });
    }
    return classesInFile;
  }, [fileInAnalysis]);

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

  const methodsTableColumns: ColumnsType<ClassMethodWithName> = [
    {
      title: 'Method',
      key: 'methodname',
      render: (_, record) => <span>{record.methodName}</span>,
      sorter: (a, b) => a.methodName.localeCompare(b.methodName),
    },
    {
      title: 'Has Issues',
      key: 'issues',
      render: (_, record) => <span>{record.methodHasIssues && <CheckOutlined />}</span>,
      align: 'center',
      sorter: (a, b) => Number(a.methodHasIssues) - Number(b.methodHasIssues),
    },
  ];

  const classMetricsList = React.useMemo(() => {
    if (!selectedClass) return [];
    const metricsList = [];
    for (const [metricId, metricValue] of selectedClass.metrics) {
      const metric = metrics.find((item) => item.metric_input_id === metricId);
      if (metric) {
        metricsList.push({ metricName: metric.name, metricValue });
      }
    }
    return metricsList;
  }, [selectedClass]);

  const classIssuesList = React.useMemo(() => {
    if (!selectedClass || !selectedClass.issuesAnalysed) return [];
    const issuesList = [];
    for (const [issueId, issueResult] of selectedClass.issuesAnalysed) {
      const issue = issuesInAnalysis.find((element) => element.badSmell_id === issueId);
      if (issue) {
        issuesList.push({ issue, issueResult });
      }
    }
    return issuesList;
  }, [selectedClass]);

  const methodsInClassList = React.useMemo(() => {
    if (!selectedClass) return [];
    const methodsList = [];
    for (const [methodName, methodObject] of selectedClass.methods) {
      methodsList.push({ methodName, ...methodObject });
    }
    return methodsList;
  }, [selectedClass]);

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: <Typography.Text strong>Metrics</Typography.Text>,
      children: (
        <Table
          dataSource={classMetricsList}
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
        selectedClass && selectedClass.classItselfHasIssues ? (
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
                      selectedClass.metrics,
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
    {
      key: '3',
      label:
        selectedClass && !selectedClass.classItselfHasIssues && selectedClass.classHasIssues ? (
          <Typography.Text strong type="danger">
            Methods
          </Typography.Text>
        ) : (
          <Typography.Text strong>Methods</Typography.Text>
        ),
      children: (
        <Table
          dataSource={methodsInClassList}
          columns={methodsTableColumns}
          rowKey={(record) => String(record.methodName)}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <MethodAnalysisDetails methodInAnalysis={record} issuesInAnalysis={issuesInAnalysis} metrics={metrics} />
            ),
          }}
          pagination={{ position: ['bottomCenter'] }}
        />
      ),
    },
  ];

  return {
    classesList,
    methodsInClassList,
    collapseItems,
    setSelectedClass,
  };
}

export default useFileAnalysisDetailHook;

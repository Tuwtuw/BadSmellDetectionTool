import React from 'react';

import { FileAnalysisDetailProps } from './file-analysis-detail';
import { BadSmell, ClassMethod, FileClass, Metric } from '../../../logic/types';
import Table, { ColumnsType } from 'antd/es/table';
import { CheckOutlined } from '@ant-design/icons';
import { Space, CollapseProps, Typography } from 'antd';

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
      classesInFile.push({ label: className, value: className, class: classObject });
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

  const issuesTableColumns: ColumnsType<{ issueName: string; issueResult: boolean }> = [
    {
      title: 'Issue',
      key: 'issuename',
      dataIndex: 'issueName',
      // sorter: (a, b) => a.issueName.localeCompare(b.issueName),
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              console.log('opening record details');
              // window.open
            }}
          >
            Details
          </a>
        </Space>
      ),
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
      const issueName = issuesInAnalysis.find((element) => element.badSmell_id === issueId)?.name;
      issuesList.push({ issueName, issueResult });
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
          rowKey={(record) => String(record.issueName)}
          bordered
          expandable={{
            expandedRowRender: (record) => (
              <>
                <Typography.Text strong>Description</Typography.Text>
                <p style={{ margin: 0 }}>{record.description}</p>
              </>
            ),
            rowExpandable: (record) => !!record.description,
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
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <>
          //       <Text strong>Description</Text>
          //       <p style={{ margin: 0 }}>{record.description}</p>
          //     </>
          //   ),
          //   rowExpandable: (record) => !!record.description,
          // }}
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

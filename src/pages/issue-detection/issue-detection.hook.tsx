import React from 'react';

import { Space } from 'antd';
import { IssueDetectionProps } from './issue-detection';
import { BadSmell, MetricsFile } from '../../logic/types';
import { ColumnsType } from 'antd/es/table';
import { CheckOutlined } from '@ant-design/icons';

export interface MetricsFileWithName extends MetricsFile {
  fileName: string;
}

function useIssueDetectionHook(props: IssueDetectionProps) {
  const [methodMetricsFile, setMethodsMetricsFile] = React.useState('');
  const [classMetricsFile, setClassMetricsFile] = React.useState('');
  const [issuesToAnalyseId, setIssuesToAnalyseId] = React.useState<number[]>(undefined);
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [analysisResult, setAnalysisResult] = React.useState<Map<string, MetricsFile>>();
  const [issues, setIssues] = React.useState<BadSmell[]>(undefined);

  const [fileInAnalysis, setFileInAnalysis] = React.useState<MetricsFileWithName>();
  const [detailsOpen, setDetailsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.api.database.badSmell.fetchAll().then(
      (data) => {
        setIssues(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const tableData = React.useMemo<MetricsFileWithName[]>(() => {
    if (!analysisResult) return [];
    const data = [];
    for (const [fileName, fileObject] of analysisResult) {
      data.push({ fileName, ...fileObject });
      if (fileObject.fileHasIssues) console.log(fileName);
    }

    console.log(data[0]);
    return data;
  }, [analysisResult]);

  const columns: ColumnsType<MetricsFileWithName> = [
    {
      title: 'File',
      key: 'filename',
      render: (_, record) => <span>{record.fileName}</span>,
      sorter: (a, b) => a.fileName.localeCompare(b.fileName),
    },
    {
      title: 'Has Issues',
      key: 'issues',
      render: (_, record) => <span>{record.fileHasIssues && <CheckOutlined />}</span>,
      align: 'center',
      sorter: (a, b) => Number(a.fileHasIssues) - Number(b.fileHasIssues),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setFileInAnalysis(record);
              setDetailsOpen(true);
              // window.open
            }}
          >
            Details
          </a>
        </Space>
      ),
    },
  ];

  const issuesList = React.useMemo(() => {
    return issues?.map((issue) => {
      return {
        value: issue.badSmell_id,
        issue: issue,
        label: issue.name,
      };
    });
  }, [issues]);

  const runIssueAnalysis = React.useCallback(() => {
    return window.api.analyser.runAnalysis(classMetricsFile, methodMetricsFile, issuesToAnalyseId);
  }, [classMetricsFile, methodMetricsFile, issuesToAnalyseId]);

  const newMethodsFile = React.useCallback(
    (filePath: string) => {
      setMethodsMetricsFile(filePath);
    },
    [setMethodsMetricsFile],
  );

  const newClassFile = React.useCallback(
    (filePath: string) => {
      setClassMetricsFile(filePath);
    },
    [setClassMetricsFile],
  );

  const onSelectChange = React.useCallback(
    (value: number[]) => {
      setIssuesToAnalyseId(value);
    },
    [setIssuesToAnalyseId],
  );

  return {
    columns,
    tableData,
    issuesList,
    currentStep,
    setCurrentStep,
    methodMetricsFile,
    classMetricsFile,
    newClassFile,
    newMethodsFile,
    onSelectChange,
    runIssueAnalysis,
    setAnalysisResult,
    detailsOpen,
    setDetailsOpen,
    fileInAnalysis,
  };
}

export default useIssueDetectionHook;

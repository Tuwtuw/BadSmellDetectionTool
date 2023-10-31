import React from 'react';

import { IssueDetectionProps } from './issue-detection';
import { BadSmell } from '../../logic/types';

function useIssueDetectionHook(props: IssueDetectionProps) {
  const [methodMetricsFile, setMethodsMetricsFile] = React.useState('');
  const [classMetricsFile, setClassMetricsFile] = React.useState('');
  const [issuesToAnalyseId, setIssuesToAnalyseId] = React.useState<number[]>(undefined);
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [issues, setIssues] = React.useState<BadSmell[]>(undefined);

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
    console.log(classMetricsFile, methodMetricsFile, issuesToAnalyseId);
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
    issuesList,
    currentStep,
    setCurrentStep,
    methodMetricsFile,
    classMetricsFile,
    newClassFile,
    newMethodsFile,
    onSelectChange,
    runIssueAnalysis,
  };
}

export default useIssueDetectionHook;

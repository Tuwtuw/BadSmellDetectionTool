import React from 'react';

import { FileAnalysisDetailProps } from './file-analysis-detail';
import { ClassMethod, FileClass } from '../../../logic/types';
import { ColumnsType } from 'antd/es/table';
import { CheckOutlined } from '@ant-design/icons';
import { Space } from 'antd';

export interface ClassMethodWithName extends ClassMethod {
  methodName: string;
}
function useFileAnalysisDetailHook(props: FileAnalysisDetailProps) {
  const { fileInAnalysis } = props;
  const [selectedClass, setSelectedClass] = React.useState<FileClass>();

  const classesList = React.useMemo(() => {
    if (!fileInAnalysis) return [];
    const classesInFile = [];
    for (const [className, classObject] of fileInAnalysis.classes) {
      classesInFile.push({ label: className, value: className, class: classObject });
    }
    return classesInFile;
  }, [fileInAnalysis]);

  const columns: ColumnsType<ClassMethodWithName> = [
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

  const methodsInClassList = React.useMemo(() => {
    if (!selectedClass) return [];
    const methodsList = [];
    for (const [methodName, methodObject] of selectedClass.methods) {
      methodsList.push({ methodName, ...methodObject });
    }
    return methodsList;
  }, [selectedClass]);

  return {
    classesList,
    methodsInClassList,
    columns,
    setSelectedClass,
  };
}

export default useFileAnalysisDetailHook;

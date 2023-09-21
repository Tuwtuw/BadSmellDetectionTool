import React from 'react';
import { Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { DetectionStrategiesProps } from './detection-strategies';

export interface DetectionStrategies {
  key: string;
  name: string;
  formula: string;
  description?: string;
}

function useDetectionStrategiesHook(props: DetectionStrategiesProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const columns: ColumnsType<DetectionStrategies> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a onClick={() => setEditModalOpen(!editModalOpen)}>Edit</a>
          <a onClick={() => setDeleteModalOpen(!deleteModalOpen)}>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DetectionStrategies[] = [
    {
      key: '1',
      name: 'Rezende (2023) Data Class Threshold',
      formula:
        'totalMethodsQty  <  5 && fanin  <=  2 && fanout  <=  7 && returnQty  <=  0 && finalFieldsQty  >=  3 && mathOperationsQty  =  0 && maxNestedBlocksQty  <  1 && noc  =  0',
      description: 'Test Description',
    },
    {
      key: '2',
      name: 'Rezende (2023) Large Class Threshold',
      formula:
        'LOC > 200 && totalMethodsQty > 12 && cboModified >= 10 && staticFieldsQty > 1 && finalFieldsQty > 3 && stringLiteralsQty > 3 && assignmentsQty > 21 &&variablesQty > 15',
    },
    {
      key: '3',
      name: 'Rezende (2023) Feature Envy Threshold',
      formula: 'fanout > 15',
    },
  ];

  return {
    columns,
    data,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
  };
}

export default useDetectionStrategiesHook;

import React from 'react';
import { Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { BadSmellsProps } from './bad-smells';
import { DetectStrat } from '../detection-strategies';

interface BadSmells {
  key: string;
  name: string;
  detectionStrategy: DetectStrat;
  scope: string;
  description?: string;
}

function useBadSmellsHook(props: BadSmellsProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const columns: ColumnsType<BadSmells> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Current Detection Strategy',
      key: 'detectStrat',
      render: (_, record) => record.detectionStrategy.name,
    },
    {
      title: 'Scope',
      key: 'scope',
      dataIndex: 'scope',
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

  const detectStrat: DetectStrat = { name: 'TestStrat' } as DetectStrat;

  const data: BadSmells[] = [
    {
      key: '1',
      name: 'Data Class',
      detectionStrategy: detectStrat,
      scope: 'Class',
      description:
        'A data class refers to a class that contains only fields and crude methods for accessing them (getters and setters). These are simply containers for data used by other classes. ',
    },
    {
      key: '2',
      name: 'Large Class',
      detectionStrategy: detectStrat,
      scope: 'Class',
      description: 'A class contains many fields/methods/lines of code.',
    },
    {
      key: '3',
      name: 'Feature Envy',
      detectionStrategy: detectStrat,
      scope: 'Method',
      description: 'A method accesses the data of another object more than its own data.',
    },
    {
      key: '4',
      name: 'Refused Bequest',
      detectionStrategy: detectStrat,
      scope: 'Class',
      description:
        'If a subclass uses only some of the methods and properties inherited from its parents. The unneeded methods may simply go unused or be redefined and give off exceptions.',
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

export default useBadSmellsHook;

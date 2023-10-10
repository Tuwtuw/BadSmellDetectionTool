import React from 'react';
import { Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Metric } from '../../logic/types';

import { MetricsProps } from './metrics';

function useMetricsHook(props: MetricsProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const columns: ColumnsType<Metric> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: 'Restrictions',
      key: 'restrictions',
      render: (_, record) => (
        <>
          {record.min != null || record.max != null
            ? `${record.min != null ? `${record.min} < ` : ''} ${record.name} ${
                record.max != null ? ` < ${record.max}` : ''
              }`
            : undefined}
        </>
      ),
      filters: [
        {
          text: 'Has Restrictions',
          value: true,
        },
        {
          text: 'No Restrictions',
          value: false,
        },
      ],
      onFilter: (value: boolean, record) => (record.min != null || record.max != null) === value,
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

  const data: Metric[] = [
    {
      metric_id: 1,
      name: 'LOC (Lines of code)',
      type: 'Number',
      min: 0,
      description:
        "It counts the lines of count, ignoring empty lines and comments (i.e., it's Source Lines of Code, or SLOC). The number of lines here might be a bit different from the original file, as we use JDT's internal representation of the source code to calculate it.",
    },
    {
      metric_id: 2,
      name: 'NOC (Number of Children)',
      type: 'Number',
      min: 0,
      description: 'It counts the number of immediate subclasses that a particular class has.',
    },
    {
      metric_id: 3,
      name: 'Has Javadoc',
      type: 'Boolean',
      description: 'Boolean indicating whether a method has javadoc. (Only at method-level for now)',
    },
    {
      metric_id: 4,
      name: 'Test Metric',
      min: 0,
      max: 1,
      type: 'Number',
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

export default useMetricsHook;

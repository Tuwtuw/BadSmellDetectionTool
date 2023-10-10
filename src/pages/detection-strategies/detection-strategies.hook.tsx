import React, { useCallback } from 'react';
import { Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DetectionStrategy } from '../../logic/types';

function useDetectionStrategiesHook() {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [detectionStrategyToDeleteId, setDetectionStrategyToDeleteId] = React.useState<number | undefined>(undefined);
  const [detectionStrategies, setDetectionStrategies] = React.useState<DetectionStrategy[]>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  React.useEffect(() => {
    window.api.database.detectionStrategy.fetchAll().then(
      (data) => {
        setDetectionStrategies(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const deleteDetectionStrategy = useCallback(() => {
    console.log('Deleting id: ', detectionStrategyToDeleteId);
    window.api.database.detectionStrategy.delete(detectionStrategyToDeleteId);
    setDetectionStrategies(
      detectionStrategies.filter((strategy) => strategy.detectionStrategy_id !== detectionStrategyToDeleteId),
    );
    setDetectionStrategyToDeleteId(undefined);
    setDeleteModalOpen(false);
  }, [detectionStrategyToDeleteId]);

  const columns: ColumnsType<DetectionStrategy> = [
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
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => setEditModalOpen(!editModalOpen)}>Edit</a>
          <a
            onClick={() => {
              console.log('Setting the following id:', record.detectionStrategy_id);
              setDetectionStrategyToDeleteId(record.detectionStrategy_id);
              setDeleteModalOpen(true);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return {
    columns,
    detectionStrategies,
    deleteDetectionStrategy,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
  };
}

export default useDetectionStrategiesHook;

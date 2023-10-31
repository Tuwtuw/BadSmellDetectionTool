import React, { useCallback } from 'react';
import { Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Metric } from '../../logic/types';

import { MetricsProps } from './metrics';
import { Link } from 'react-router-dom';

function useMetricsHook(props: MetricsProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [metricToDeleteId, setMetricToDeleteId] = React.useState<number | undefined>(undefined);
  const [metrics, setMetrics] = React.useState<Metric[]>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  React.useEffect(() => {
    window.api.database.metric.fetchAll().then(
      (data) => {
        setMetrics(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const deleteMetric = useCallback(() => {
    window.api.database.detectionStrategy.delete(metricToDeleteId);
    setMetrics(metrics.filter((metric) => metric.metric_id !== metricToDeleteId));
    setMetricToDeleteId(undefined);
    setDeleteModalOpen(false);
  }, [metricToDeleteId]);

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
      title: 'Metric ID',
      dataIndex: 'metric_input_id',
      key: 'metric_input_id',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to="/metrics/edit" state={{ editTarget: record }}>
            Edit
          </Link>
          <a
            onClick={() => {
              setMetricToDeleteId(record.metric_id);
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
    metrics,
    editModalOpen,
    deleteModalOpen,
    setEditModalOpen,
    setDeleteModalOpen,
    deleteMetric,
  };
}

export default useMetricsHook;

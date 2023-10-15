import React, { memo, ReactNode } from 'react';
import { Table, Modal, Typography, Button } from 'antd';

import useMetricsHook from './metrics.hook';
import * as styled from './metrics.styles';
import { Link } from 'react-router-dom';

export interface MetricsProps {
  /*
   * Defines component's children
   */
  children?: ReactNode;
  /*
   * Defines custom className
   */
  className?: string;
  /*
   * Defines component's custom style
   */
  style?: React.CSSProperties;
}

function Metrics(props: MetricsProps) {
  const { className, style } = props;

  const { Title, Text } = Typography;

  const { columns, metrics, deleteModalOpen, setDeleteModalOpen } = useMetricsHook(props);
  return (
    <styled.Metrics className={`${className ?? ''}`.trim()} style={style}>
      <div className="header">
        <Title>Metrics</Title>
        <Link to="/metrics/new">
          <Button>New Metric</Button>
        </Link>
      </div>
      <Table
        dataSource={metrics}
        columns={columns}
        rowKey={(record) => String(record.metric_id)}
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <>
              <Text strong>Description</Text>
              <p style={{ margin: 0 }}>{record.description}</p>
            </>
          ),
          rowExpandable: (record) => !!record.description,
        }}
        pagination={{ position: ['bottomCenter'] }}
      />
      <Modal title="Are you sure?" open={deleteModalOpen} onCancel={() => setDeleteModalOpen(false)}>
        <p>This action is irreversible.</p>
      </Modal>
    </styled.Metrics>
  );
}

export default memo(Metrics) as unknown as typeof Metrics;

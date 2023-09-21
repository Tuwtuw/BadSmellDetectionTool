import React, { memo, ReactNode } from 'react';
import { Table, Modal, Typography, Button } from 'antd';

import useMetricsHook from './metrics.hook';
import * as styled from './metrics.styles';

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

  const { Title } = Typography;

  const { columns, data, deleteModalOpen, setDeleteModalOpen } = useMetricsHook(props);
  return (
    <styled.Metrics className={`${className ?? ''}`.trim()} style={style}>
      <div className="header">
        <Title>Metrics</Title>
        <Button>New Metric</Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
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

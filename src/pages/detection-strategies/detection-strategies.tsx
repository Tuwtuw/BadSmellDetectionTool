import React, { memo, ReactNode } from 'react';
import { Table, Modal, Typography, Button, Divider } from 'antd';

import useDetectionStrategiesHook from './detection-strategies.hook';
import * as styled from './detection-strategies.styles';

export interface DetectionStrategiesProps {
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

function DetectionStrategies(props: DetectionStrategiesProps) {
  const { className, style } = props;

  const { Title } = Typography;

  const { columns, detectionStrategies, deleteDetectionStrategy, deleteModalOpen, setDeleteModalOpen } =
    useDetectionStrategiesHook();

  return (
    <styled.DetectionStrategies className={`${className ?? ''}`.trim()} style={style}>
      <div className="header">
        <Title>Detection Strategies</Title>
        <Button>New Detection Strategy</Button>
      </div>
      <Table
        dataSource={detectionStrategies}
        columns={columns}
        rowKey={(record) => String(record.detectionStrategy_id)}
        bordered
        expandable={{
          expandedRowRender: (record) => {
            return (
              <div>
                <p style={{ margin: 0 }}>{record.description}</p>
                <Divider />
                <p style={{ margin: 0 }}>{record.formula}</p>
              </div>
            );
          },
          rowExpandable: (record) => !!record.description || !!record.formula,
        }}
        pagination={{ position: ['bottomCenter'] }}
      />
      <Modal
        title="Are you sure?"
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={() => deleteDetectionStrategy()}
      >
        <p>This action is irreversible.</p>
      </Modal>
    </styled.DetectionStrategies>
  );
}

export default memo(DetectionStrategies) as unknown as typeof DetectionStrategies;

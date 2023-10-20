import React, { memo, ReactNode } from 'react';
import { Table, Modal, Typography, Button } from 'antd';

import useBadSmellsHook from './bad-smells.hook';
import * as styled from './bad-smells.styles';
import { Link } from 'react-router-dom';

export interface BadSmellsProps {
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

function BadSmells(props: BadSmellsProps) {
  const { className, style } = props;

  const { Title, Text } = Typography;

  const { columns, badSmells, deleteModalOpen, setDeleteModalOpen, deleteBadSmell } = useBadSmellsHook(props);

  return (
    <styled.BadSmells className={`${className ?? ''}`.trim()} style={style}>
      <div className="header">
        <Title>Bad Smells</Title>
        <Link to="/badsmells/new">
          <Button>New Bad Smell</Button>
        </Link>
      </div>
      <Table
        dataSource={badSmells}
        columns={columns}
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
      <Modal
        title="Are you sure?"
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={() => deleteBadSmell()}
      >
        <p>This action is irreversible.</p>
      </Modal>
    </styled.BadSmells>
  );
}

export default memo(BadSmells) as unknown as typeof BadSmells;

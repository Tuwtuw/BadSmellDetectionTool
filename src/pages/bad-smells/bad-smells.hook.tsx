import React from 'react';
import { Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { BadSmellsProps } from './bad-smells';
import { BadSmell } from '../../logic/types';
import { Link } from 'react-router-dom';

function useBadSmellsHook(props: BadSmellsProps) {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [badSmellToDeleteId, setBadSmellToDeleteId] = React.useState<number | undefined>(undefined);
  const [badSmells, setBadSmells] = React.useState<BadSmell[]>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  React.useEffect(() => {
    window.api.database.badSmell.fetchAll().then(
      (data) => {
        setBadSmells(data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const deleteBadSmell = React.useCallback(() => {
    window.api.database.badSmell.delete(badSmellToDeleteId);
    setBadSmells(badSmells.filter((badSmell) => badSmell.badSmell_id !== badSmellToDeleteId));
    setBadSmellToDeleteId(undefined);
    setDeleteModalOpen(false);
  }, [badSmellToDeleteId]);

  const columns: ColumnsType<BadSmell> = [
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
      render: (_, record) => record.detectionStrategy?.name,
    },
    {
      title: 'Scope',
      key: 'scope',
      dataIndex: 'scope',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to="/badsmells/edit" state={{ editTarget: record }}>
            Edit
          </Link>
          <a
            onClick={() => {
              setBadSmellToDeleteId(record.badSmell_id);
              setDeleteModalOpen(!deleteModalOpen);
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
    editModalOpen,
    deleteModalOpen,
    setEditModalOpen,
    setDeleteModalOpen,
    deleteBadSmell,
  };
}

export default useBadSmellsHook;

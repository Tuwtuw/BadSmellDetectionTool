import React from 'react';

import { MainMenuProps } from './main-menu';

function useMainMenuHook(props: MainMenuProps) {
  // Later change to use Sqlite database to store data.
  // Change to useMemo when retrieving from database.
  const dataSourceMock = [
    {
      key: '1',
      date: new Date().toString(),
      issues: 'God Class, Shotgun Surgery',
    },
    {
      key: '2',
      date: new Date().toString(),
      issues: 'Refused Bequest, Shotgun Surgery, Duplicated Code',
    },
  ];

  const columnsMock = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Issues Analyzed',
      dataIndex: 'issues',
      key: 'issues',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <a>Details</a>,
    },
  ];

  return {
    dataSourceMock,
    columnsMock,
  };
}

export default useMainMenuHook;

import React, { ReactNode } from 'react';

import { AppProps } from './app';
import { LineChartOutlined, AimOutlined, BugOutlined, CodeOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

function useAppHook(props: AppProps) {
  const getItem = (label: ReactNode, key: string, icon: ReactNode, children?: ItemType[]): ItemType => {
    return {
      key,
      icon,
      children,
      label,
    };
  };

  const items = React.useMemo(
    () => [
      getItem('Metrics', 'metrics', <LineChartOutlined />),
      getItem('Detection Strategies', 'strategies', <AimOutlined />),
      getItem('Bad Smells', 'badsmells', <BugOutlined />),
      getItem('Run Issue Detection', 'issuedetection', <CodeOutlined />),
    ],
    [getItem],
  );

  return {
    items,
  };
}

export default useAppHook;

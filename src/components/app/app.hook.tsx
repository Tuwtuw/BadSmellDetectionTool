import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppProps } from './app';
import { HomeOutlined, LineChartOutlined, AimOutlined, BugOutlined, CodeOutlined } from '@ant-design/icons';
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
      getItem(<Link to="/">Home</Link>, 'home', <HomeOutlined />),
      getItem(<Link to="/metrics">Metrics</Link>, 'metrics', <LineChartOutlined />),
      getItem(<Link to="/strategies">Detection Strategies</Link>, 'strategies', <AimOutlined />),
      getItem(<Link to="/badsmells">Bad Smells</Link>, 'badsmells', <BugOutlined />),
      getItem(<Link to="/detect">Run Issue Detection</Link>, 'issuedetection', <CodeOutlined />),
    ],
    [getItem],
  );

  return {
    items,
  };
}

export default useAppHook;

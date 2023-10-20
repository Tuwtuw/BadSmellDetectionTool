import React, { memo } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

import useAppHook from './app.hook';
import * as styled from './app.styles';

export interface AppProps {
  /*
   * Defines custom className
   */
  className?: string;
  /*
   * Defines component's custom style
   */
  style?: React.CSSProperties;
}

function App(props: AppProps) {
  const { className, style } = props;

  const { Header, Content, Sider } = Layout;
  const { Title } = Typography;

  const { items } = useAppHook(props);

  return (
    <styled.App className={`${className ?? ''}`.trim()} style={style}>
      <Header className="main-header">
        <Title level={2}>Bad Smell Detection Tool</Title>
      </Header>
      <Layout hasSider>
        <Sider className="sider" collapsible>
          <Menu items={items} />
        </Sider>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </styled.App>
  );
}

export default memo(App) as unknown as typeof App;

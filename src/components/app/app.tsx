import React, { memo, ReactNode } from 'react';
import { Layout, Menu } from 'antd';

import useAppHook from './app.hook';
import * as styled from './app.styles';

export interface AppProps {
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

function App(props: AppProps) {
  const { children, className, style } = props;

  const { Header, Content, Sider } = Layout;

  const { items } = useAppHook(props);

  return (
    <styled.App className={`${className ?? ''}`.trim()} style={style}>
      <Header>Header</Header>
      <Layout hasSider>
        <Sider collapsible>
          <Menu items={items} />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </styled.App>
  );
}

export default memo(App) as unknown as typeof App;

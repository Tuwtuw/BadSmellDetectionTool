import React, { memo, ReactNode } from 'react';
import { Layout, Menu } from 'antd';

import useMainMenuHook from './main-menu.hook';
import * as styled from './main-menu.styles';
import { App } from '../../components/app';

export interface MainMenuProps {
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

function MainMenu(props: MainMenuProps) {
  const { children, className, style } = props;
  const { Header, Content, Sider } = Layout;

  const { count, increment, decrement } = useMainMenuHook(props);

  return (
    <styled.MainMenu className={`${className ?? ''}`.trim()} style={style}>
      <App>Content</App>
    </styled.MainMenu>
  );
}

export default memo(MainMenu) as unknown as typeof MainMenu;

import React, { memo, ReactNode } from 'react';
import { Button, Table, Typography } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

import useMainMenuHook from './main-menu.hook';
import * as styled from './main-menu.styles';
import { Link } from 'react-router-dom';

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
  const { className, style } = props;

  const { Title } = Typography;

  const { dataSourceMock, columnsMock } = useMainMenuHook(props);

  return (
    <styled.MainMenu className={`${className ?? ''}`.trim()} style={style}>
      <div className="content-centered">
        <Title>Latest Issue Detections</Title>
      </div>
      <Table dataSource={dataSourceMock} columns={columnsMock} />
      <div className="content-centered">
        <Link to="/detect">
          <Button icon={<CodeOutlined />} className={'button'}>
            To Issue Detection
          </Button>
        </Link>
      </div>
    </styled.MainMenu>
  );
}

export default memo(MainMenu) as unknown as typeof MainMenu;

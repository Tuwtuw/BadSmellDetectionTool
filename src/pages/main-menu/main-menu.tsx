import React, { memo, ReactNode } from 'react';
import { AimOutlined, BugOutlined, CodeOutlined, LineChartOutlined } from '@ant-design/icons';

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

  return (
    <styled.MainMenu className={`${className ?? ''}`.trim()} style={style}>
      <div className="content-centered">
        <Link to="/metrics" className="link">
          <div>
            <LineChartOutlined style={{ display: 'block' }} />
            Metrics
          </div>
        </Link>
        <Link to="/strategies" className="link">
          <div>
            <AimOutlined style={{ display: 'block' }} />
            Detection Strategies
          </div>
        </Link>
        <Link to="/badsmells" className="link">
          <div>
            <BugOutlined style={{ display: 'block' }} />
            Bad Smells
          </div>
        </Link>
        <Link to="/detect" className="link">
          <div>
            <CodeOutlined style={{ display: 'block' }} />
            Issue Detection
          </div>
        </Link>
      </div>
    </styled.MainMenu>
  );
}

export default memo(MainMenu) as unknown as typeof MainMenu;

import { styled } from 'styled-components';
import { Layout } from 'antd';

export const App = styled(Layout)`
  width: 100%;
  height: 100%;

  .content {
    margin: 2.5em;
  }

  .main-header {
    background: #fff;
  }

  .sider {
    background: #fff;
  }

  .content {
    overflow: auto;
  }
`;

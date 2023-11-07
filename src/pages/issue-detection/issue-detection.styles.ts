import { styled } from 'styled-components';

export const IssueDetection = styled.div`
  width: 100%;
  height: 100%;

  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: space-between;
  }

  .centered-loading {
    display: flex;
    position: relative;
    justify-content: center;
    top: 34%;
    width: 100%;
    overflow: hidden;
  }
`;

import React from 'react';
  
  import { IssueDetectionProps } from './issue-detection';

  function useIssueDetectionHook(props: IssueDetectionProps) {
  
    const [count, setCount] = React.useState(0);
  
    const increment = () => {
      setCount(count + 1);
    };
  
    const decrement = () => {
      setCount(count - 1);
    };
  
    return {
      count,
      increment,
      decrement,
    };
  }
  
  export default useIssueDetectionHook;
  
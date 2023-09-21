import React from 'react';
  
  import { DetectionExecutionProps } from './detection-execution';

  function useDetectionExecutionHook(props: DetectionExecutionProps) {
  
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
  
  export default useDetectionExecutionHook;
  
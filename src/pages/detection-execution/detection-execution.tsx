import React, { memo, ReactNode } from 'react';
  
  import useDetectionExecutionHook from './detection-execution.hook';
  import * as styled from './detection-execution.styles';
  
  export interface DetectionExecutionProps {
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
  
  function DetectionExecution(props: DetectionExecutionProps) {
    const { children, className, style } = props;
  
    const { count, increment, decrement } = useDetectionExecutionHook(props);
  
    return (
        <styled.DetectionExecution className={`${className ?? ''}`.trim()} style={style}>
          <h1>Hello from Scaffolding!</h1>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          {children}
        </styled.DetectionExecution>
    );
  }
  
  export default memo(DetectionExecution) as unknown as typeof DetectionExecution;
  
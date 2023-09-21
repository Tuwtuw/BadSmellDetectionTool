import React from 'react';
  
  import { ErrorPageProps } from './error-page';

  function useErrorPageHook(props: ErrorPageProps) {
  
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
  
  export default useErrorPageHook;
  
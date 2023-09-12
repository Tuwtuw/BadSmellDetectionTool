import React from 'react';
  
  import { MainMenuProps } from './main-menu';

  function useMainMenuHook(props: MainMenuProps) {
  
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
  
  export default useMainMenuHook;
  
import React from 'react';

import { CreatePageProps } from './create-page';

function useCreatePageHook(props: CreatePageProps) {
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

export default useCreatePageHook;

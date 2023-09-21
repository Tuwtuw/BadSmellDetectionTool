(function Template() {
  const toPascalCase = (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (fl) => fl.toUpperCase()).replace(/\W+/g, '');
  const toCamelCase = (str) => toPascalCase(str).replace(/^./, (firstLetter) => firstLetter.toLowerCase());
  const toKebabCase = (str) => toCamelCase(str).replace(/([A-Z])/g, (word) => '-' + word.toLowerCase());

  const toPascalCaseTitle = (str) =>
    toPascalCase(str)
      .replace(/([A-Z])/g, (word) => ' ' + word)
      .trim();

  return {
    userInputs: [
      {
        title: 'Component Name',
        argumentName: 'name',
        defaultValue: 'Component',
      },
    ],
    template: [
      {
        type: 'folder',
        name: (inputs) => `${toKebabCase(inputs.name)}`,
        children: [
          {
            type: 'file',
            name: (inputs) => `index.ts`,
            content: (inputs) => `export type { ${toPascalCase(inputs.name)}Props } from './${toKebabCase(
              inputs.name,
            )}';
  export * from './${toKebabCase(inputs.name)}.routes';

  export { default as ${toPascalCase(inputs.name)}, default } from './${toKebabCase(inputs.name)}';
  `,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.tsx`,
            content: (inputs) => `import React, { memo, ReactNode } from 'react';
  
  import use${toPascalCase(inputs.name)}Hook from './${toKebabCase(inputs.name)}.hook';
  import * as styled from './${toKebabCase(inputs.name)}.styles';
  
  export interface ${toPascalCase(inputs.name)}Props {
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
  
  function ${toPascalCase(inputs.name)}(props: ${toPascalCase(inputs.name)}Props) {
    const { children, className, style } = props;
  
    const { count, increment, decrement } = use${toPascalCase(inputs.name)}Hook(props);
  
    return (
        <styled.${toPascalCase(inputs.name)} className={\`\${className ?? ''}\`.trim()} style={style}>
          <h1>Hello from Scaffolding!</h1>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          {children}
        </styled.${toPascalCase(inputs.name)}>
    );
  }
  
  export default memo(${toPascalCase(inputs.name)}) as unknown as typeof ${toPascalCase(inputs.name)};
  `,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.hook.tsx`,
            content: (inputs) => `import React from 'react';
  
  import { ${toPascalCase(inputs.name)}Props } from './${toKebabCase(inputs.name)}';

  function use${toPascalCase(inputs.name)}Hook(props: ${toPascalCase(inputs.name)}Props) {
  
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
  
  export default use${toPascalCase(inputs.name)}Hook;
  `,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.routes.tsx`,
            content: (inputs) => `import React from 'react';
  
  const ${toPascalCase(inputs.name)} = React.lazy(() => import('.'));
  
  export const routes = [
  ];
  `,
          },
          {
            type: 'file',
            name: (inputs) => `${toKebabCase(inputs.name)}.styles.ts`,
            content: (inputs) => `import {styled} from 'styled-components';

  
  export const ${toPascalCase(inputs.name)} = styled.div\`
    width:100%;
    height 100%;
  \`;
  `,
          },
        ],
      },
    ],
  };
});

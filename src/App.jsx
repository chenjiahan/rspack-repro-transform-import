import { useState } from "react";
import React from "react";
import { Button } from "antd";

const HelloWorld = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Rsbuild + React</h1>

      <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Butto1n</Button>
        <button type="button" onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>App.tsx</code> to test HMR
        </p>
      </div>
    </div>
  );
};

export default HelloWorld;

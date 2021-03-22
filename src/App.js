import { useState } from "react";
import "./styles.css";

import { RoughNotation } from "./RoughNotation";
import { RoughNotationGroup } from "./RoughNotationGroup";

export default function App() {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#000");
  const [animate, setAnimate] = useState(true);
  const [padding, setPadding] = useState(5);
  const [stroke, setStroke] = useState(1);

  return (
    <div className="App">
      <div>
        <RoughNotationGroup show={show}>
          <RoughNotation>Hello CodeSandbox</RoughNotation>
          <RoughNotation>Hello CodeSandbox</RoughNotation>
        </RoughNotationGroup>
        <RoughNotation
          animate={animate}
          color={color}
          padding={padding}
          show={show}
          strokeWidth={stroke}
        >
          Hello CodeSandbox
        </RoughNotation>
      </div>
      <label>
        Show:
        <input
          onChange={({ target }) => setShow(target.checked)}
          type="checkbox"
        />
      </label>
      <label>
        Animate:
        <input
          checked={animate}
          onChange={({ target }) => setAnimate(target.checked)}
          type="checkbox"
        />
      </label>
      <label style={{ padding: "1em" }}>
        Color:
        <input type="color" onChange={({ target }) => setColor(target.value)} />
      </label>
      <label style={{ padding: "1em" }}>
        Padding:
        <input
          max="100"
          min="0"
          onChange={({ target }) => setPadding(parseInt(target.value, 10))}
          type="range"
          value={padding}
        />
      </label>
      <label style={{ padding: "1em" }}>
        Stroke:
        <input
          max="100"
          min="0"
          onChange={({ target }) => setStroke(parseInt(target.value, 10))}
          type="range"
          value={stroke}
        />
      </label>
    </div>
  );
}

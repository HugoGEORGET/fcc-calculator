import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {
  const [input, setInput] = useState(0);
  const [previousResult, setPreviousResult] = useState("");
  const [output, setOutput] = useState(0);

  function clear() {
    setInput(0);
    setPreviousResult("");
    setOutput(0);
  }

  function handleClick(char) {
    if (previousResult) {
      setInput(previousResult);
      setPreviousResult("");
    }

    setInput(input =>
      String(input + char)
        .replace(/^00+/, "0")
        .replace("..", ".")
    );

    // !(char === "." && output.includes("."))
    if (!/[+/x-]/.test(char)) {
      if (!(char === "." && output.includes("."))) {
        setOutput(
          output =>
            String(output + char)
              .replace(/^00+/, "0")
              .replace("..", ".")
              .replace(/^[+/x-]/, "") // remove any non-digit at the beginning of output
        );
      }
    } else {
      setOutput(char);
    }
  }

  function calculate() {
    let inputToCalculate = input;

    if (/\D{2,}/.test(input)) {
      // successive operators
      let successiveOperators = /\D{2,}/.exec(input);
      let lastOperatorInSuccession = successiveOperators[0].slice(-1);

      if (lastOperatorInSuccession === "-") {
        // successive operators with - as last
        // we must keep it to calculate the next number as negative
        successiveOperators[0] = successiveOperators[0].slice(0, -1);
        lastOperatorInSuccession = successiveOperators[0].slice(-1);
      }

      inputToCalculate = inputToCalculate.replace(
        successiveOperators[0],
        lastOperatorInSuccession
      );
    }

    setOutput(evaluate(inputToCalculate.replace("x", "*")));
    setPreviousResult(evaluate(inputToCalculate.replace("x", "*")));
  }

  return (
    <main>
      <section id="top">
        <div id="input">
          <code>{input}</code>
        </div>
        <div id="display">
          <code>{output}</code>
        </div>
      </section>
      <section id="buttons">
        <button id="clear" onClick={clear}>
          AC
        </button>
        <button id="divide" onClick={() => handleClick("/")}>
          /
        </button>
        <button id="seven" onClick={() => handleClick(7)}>
          7
        </button>
        <button id="eight" onClick={() => handleClick(8)}>
          8
        </button>
        <button id="nine" onClick={() => handleClick(9)}>
          9
        </button>
        <button id="multiply" onClick={() => handleClick("x")}>
          x
        </button>
        <button id="four" onClick={() => handleClick(4)}>
          4
        </button>
        <button id="five" onClick={() => handleClick(5)}>
          5
        </button>
        <button id="six" onClick={() => handleClick(6)}>
          6
        </button>
        <button id="subtract" onClick={() => handleClick("-")}>
          -
        </button>
        <button id="one" onClick={() => handleClick(1)}>
          1
        </button>
        <button id="two" onClick={() => handleClick(2)}>
          2
        </button>
        <button id="three" onClick={() => handleClick(3)}>
          3
        </button>
        <button id="add" onClick={() => handleClick("+")}>
          +
        </button>
        <button id="zero" onClick={() => handleClick(0)}>
          0
        </button>
        <button id="decimal" onClick={() => handleClick(".")}>
          .
        </button>
        <button id="equals" onClick={() => calculate()}>
          =
        </button>
      </section>
    </main>
  );
}

export default App;

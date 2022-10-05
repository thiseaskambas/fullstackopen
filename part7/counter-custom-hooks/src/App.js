import { useState } from "react";
import useCounter from "./useCounter";
import useField from "./useField";

const App = (props) => {
  const counter = useCounter();
  const counterTwo = useCounter();

  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.decrease}>minus</button>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.zero}>zero</button>
      </div>
      <div>
        <div>{counterTwo.value}</div>
        <button onClick={counterTwo.decrease}>minus</button>
        <button onClick={counterTwo.increase}>plus</button>
        <button onClick={counterTwo.zero}>zero</button>
      </div>
      <div>
        <form>
          name:
          <input {...name} />
          <br />
          birthdate:
          <input {...born} />
          <br />
          height:
          <input {...height} />
        </form>
        <div>
          {name.value} {born.value} {height.value}
        </div>
      </div>
    </>
  );
};

export default App;

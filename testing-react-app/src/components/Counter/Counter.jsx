import { useState } from "react";
import "./Counter.css";
import Button from "../Button/Button";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  return (
    <>
      <div className="counter">
        <Button onClick={decrement} aria-label="Decrement"> -</Button>
        

        <h1 className="count">{count}</h1>
        
        <Button onClick={increment}  aria-label="Increment"> +</Button>
      </div>
      <Button onClick={reset} className="reset-btn"> Reset</Button>
     
    </>
  );
}


import { useState, useEffect } from "react";

export default function Timer() {
  // fuck geeksforgeeks btw
  const [timeLeft, setTimeLeft] = useState(60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [active])

  return (
    <div className="m-3">
      <h1>{timeLeft}</h1>
      <div className="">

      <button onClick={() => setActive(!active)} className="hover:cursor-pointer p-3">
        {active ? "pause" : "play"}
      </button>
      <button onClick={() => setTimeLeft(60)}>
        Reset
      </button>
      </div>
    </div>
  )
}
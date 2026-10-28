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
    <div className="flex m-3 bg-mauve-900 text-center w-60 rounded-md border border-solid content-center justify-center" >
      <div className="flex flex-col p-3">
        <h1>{timeLeft}</h1>
        <div className="flex gap-3">
          <button onClick={() => setActive(!active)} className="hover:cursor-pointer">
            {active ? "Pause" : "Play"}
          </button>
          <button onClick={() => setTimeLeft(60)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
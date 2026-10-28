import { useState, useEffect } from "react";
import metalGear from "../assets/audio/metalgear.mp3"

export default function Timer() {
  // fuck geeksforgeeks btw
  const [defTime, setdefTime] = useState(5)
  const [timeLeft, setTimeLeft] = useState(defTime);
  const [active, setActive] = useState(false);

  let audio = new Audio(metalGear)
  const playMetalGear = () => {
    audio.volume = 0.2
    audio.play()
  }
  
  useEffect(() => {
    if (!active) {
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setActive(false);
          playMetalGear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [active, defTime])

  return (
    <div className="flex m-3 bg-mauve-900 text-center w-60 rounded-md border border-solid content-center justify-center" >
      <div className="flex flex-col p-3">
        <h1>{timeLeft}</h1>
        <div className="flex gap-3">
          <button onClick={() => { if (timeLeft === 0) {setTimeLeft(defTime)} setActive(!active)}} className="hover:cursor-pointer w-15">
            {active ? "Pause" : "Play"}
          </button>
          <button onClick={() => setTimeLeft(defTime)}
            className="w-15 hover:cursor-pointer"
          >Reset
          </button>
        </div>
      </div>
    </div>
  )
}
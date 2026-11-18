import { useState, useEffect } from "react";

export default function Stopclock() {
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  useEffect(() => {
    if (!active) {
      return;
    }
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [active])

  const handlePlayPause = () => {
    setActive(prev => !prev);
  }

  const handleReset = () => {
    setActive(false);
    setElapsed(0);
  }

  return (
    <div className="flex m-3 bg-mauve-900 text-center w-60 rounded-md border border-solid content-center justify-center">
      <div className="flex flex-col p-3">
        <h1>{formatTime(elapsed)}</h1>
        <div className="flex gap-3 mx-auto">
          <button onClick={handlePlayPause} className="hover:cursor-pointer w-15">
            {active ? "Pause" : "Play"}
          </button>
          <button onClick={handleReset} className="w-15 hover:cursor-pointer">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

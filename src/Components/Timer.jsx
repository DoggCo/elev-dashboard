import { useState, useEffect, useRef } from "react";
import metalGear from "../assets/audio/metalgear.mp3"

export default function Timer() {
  // fuck geeksforgeeks btw
  const [defTime, setdefTime] = useState(() => {
    const saved = localStorage.getItem("defTime");
    return saved ? parseInt(saved) : 5;
  })
  const [timeLeft, setTimeLeft] = useState(defTime);
  const [active, setActive] = useState(false);
  const [finished, setFinished] = useState(false)
  const [input, setInput] = useState(() => {
    const saved = localStorage.getItem("timeInput")
    return saved || "00:05:00"
  });

  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  const parseTheFuckingTimeYouKnobHead = (timeString) => {
    const parts = timeString.split(':').map(p => parseInt(p, 10) || 0);
    
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return parts[0];
  }

  useEffect(() => {
    localStorage.setItem("timeInput", input)
  }, [input])
  useEffect(() => {
    localStorage.setItem("defTime", defTime)
  }, [defTime])
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(metalGear);
      audioRef.current.volume = 0.2;
    }
  }, [])
  const playMetalGear = () => {
    audioRef.current.play();
  }

  // 😭😭😭

  const handlePlayPause = () => {
  if (!active) {
      const newTime = parseTheFuckingTimeYouKnobHead(input);
      setdefTime(newTime);
      setTimeLeft(newTime);
      setActive(true);
    } else {
    setInput(formatTime(timeLeft));
    setActive(false);
  }
}

  useEffect(() => {
    if (!active) {
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setActive(false);
          setFinished(true);
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
        {active || finished ? (
          <h1>{formatTime(timeLeft)}</h1>
        ) : (
          <input className="text-center"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="hh:mm:ss"
          />
        )}
        <div className="flex gap-3 mx-auto">
          <button onClick={handlePlayPause} className="hover:cursor-pointer w-15">
            {active ? "Pause" : "Play"}
          </button>
          <button onClick={() => {
            setTimeLeft(defTime)
            setInput(formatTime(defTime))
            setFinished(false)
            setActive(false)
          }}
            className="w-15 hover:cursor-pointer"
          >Reset
          </button>
        </div>
      </div>
    </div>
  )
}
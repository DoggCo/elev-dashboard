import { useState, useEffect, useRef } from "react";

export default function Timer() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const [desiredTime, setDesiredTime] = useState(3600)
  const [pause, setPause] = useState(true)

  const start = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    if (total <= 0) {
      setTimer("00:00:00");
      return;
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    setTimer((hours > 9 ? hours : "0" + hours) +
      ":" + (minutes > 9 ? minutes : "0" + minutes) +
      ":" + (seconds > 9 ? seconds : "0" + seconds));
  };

  const clear = (e) => {
    const hours = Math.floor(desiredTime / 3600);
    const minutes = Math.floor((desiredTime % 3600) / 60);
    const seconds = desiredTime % 60;
    setTimer(`${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`);
    if (Ref.current) clearInterval(Ref.current);
    // I must get the pause state to update here. Something useEffect. fuck my chud code.
    const id = setInterval(() => {
      if (!pause) {
        start(e);
      }
    }, 1000)
    Ref.current = id;
  };
  const getDead = () => {
    let dead = new Date();
    dead.setSeconds(dead.getSeconds() + desiredTime);
    return dead;
  }
  useEffect(() => {
    clear(getDead());
  }, [desiredTime])

  const clickReset = () => {
    clear(getDead());
  }
  const clickPause = () => {
    setPause(true)
    console.log(pause)
  }
  const clickUnPause = () => {
    setPause(false)
    console.log(pause)
  }
  return (
    <>
      <form>
        <input
          name="kofola" value={timer}
          onChange={(e) => {
            e.preventDefault()
            setDesiredTime(e.target.value)
          }}
        />
      </form>
      <br />
      <div className="flex flex-col">
        <button onClick={clickReset}>clear</button>
        <button onClick={clickPause}>pause</button>
        <button onClick={clickUnPause}>unpause</button>
      </div>
    </>
  )
}
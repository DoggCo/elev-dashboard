import { useState, useEffect, useRef } from "react";

export default function Stopclock() {
  const [stopClockTime, setStopClockTime] = useState(() => {
    const saved = localStorage.getItem("stopClockTime");
    return saved ? parseInt(saved) : 0;
  })
  const [active, setActive] = useState(false);

  

}

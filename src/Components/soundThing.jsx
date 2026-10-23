import { useState } from "react"

export default function SoundThing({ label, sound, volume }) {
  const [value, setValue] = useState(0)
  return (
    <div>
      <label>{label}</label>
      <input
        type="range" min="0" max="0.5" step="0.001" value={value} onChange={(e) => setValue(e.target.value)}
        className=""
      ></input>
    </div>
  )
}

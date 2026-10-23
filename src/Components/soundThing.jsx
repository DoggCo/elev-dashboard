import { useState } from "react"

export default function SoundThing({ label, onVolChange }) {
  const [value, setValue] = useState(0)

  const change = (e) => {
    const newVal = parseFloat(e.target.value);
    setValue(newVal);
    onVolChange(newVal);
  }

  return (
    <div>
      <label>{label}</label>
      <input
        type="range" min="0" max="0.5" step="0.001" value={value} onChange={change}
        className=""
      ></input>
    </div>
  )
}

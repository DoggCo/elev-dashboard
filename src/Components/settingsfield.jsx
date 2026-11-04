import r from "./../assets/refresh.svg"
import c from "./../assets/check.svg"
import { useState } from "react";

export default function Settingsfield({ Title, Description, Content, defaultValue, onRestore }) {
  const [sure, setSure] = useState(false);
  const restoreDefault = () => {
    onRestore(defaultValue)
    setSure(false)
  }
  const handleReset = () => {
    if (sure) {
      restoreDefault()
    } else {
      setSure(true);
    }
  }

  return (
    <div className="flex align-middle items-center p-3 m-1 rounded-md odd:bg-gray-500 even:bg-gray-700">
      <h2 className="font-bold w-1/6 text-2xl pr-3">{Title}</h2>
      <p className="text-lg w-7/12 mr-3">{Description}</p>
      <span className="w-3/12 ml-auto text-lg bg-white text-black p-1.5 rounded-md border-0 enabled:outline-none">
        <div className="flex w-full [&_form]:w-full [&_input]:w-full [&_input]:box-border [&_input]:focus:outline-offset-3">
          <button className="mr-3 hover:cursor-pointer" onClick={handleReset}
          ><img src={sure ? c : r} /></button>
          {Content}
        </div>
      </span>
    </div>
  )
}

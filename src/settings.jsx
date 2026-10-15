import { useEffect } from "react"
import Settingsfield from "./Components/settingsfield"
import check from "./assets/check.svg"
import SetText from "./Components/setText"

export default function Settings({ setting, setSetting, edu, setEdu, bg, setBg }) {

  const fuckOff = (e) => {
    e.stopPropagation()
  }
  useEffect(() => {
    const escSettings = (e) => {
      if (e.key === "Escape") {
        setSetting(!setting)
      }
    }

    window.addEventListener("keydown", escSettings)
    return () => window.removeEventListener("keydown", escSettings)
  }, [setting, setSetting])

  return (
    // {/* Handles the background blur */}
    <div className="flex h-full w-full absolute bg-[#000000ac] z-1 overflow-hidden " onClick={() => setSetting(!setting)} >

      {/* The actual settings panel */}
      <div className="bg-gray-600 w-5/6 h-5/6 mx-auto my-auto rounded-md overflow-y-auto" onClick={(e) => fuckOff(e)}>

          <div className="flex align-middle items-center m-2 p-3">
            <h1 className="text-3xl font-bold">Settings</h1>
            <button className="ml-auto bg-white rounded-md text-black hover:cursor-pointer w-12 h-12 text-center justify-center items-center flex" onClick={() => setSetting(!setting)}><img className="w-10" src={check} /></button>
          </div>
          <hr className="mx-3 mb-3 px-3 pb-3" />
          <Settingsfield Title="Edu navn" Description="Edu som er tilknyttet ulike lenker"
            Content={<SetText t={edu} setT={setEdu} />}
          />
          <Settingsfield Title="Background" Description="URL for background on dashboard. GIF virker også."
            Content={<SetText t={bg} setT={setBg} />}
          />

          <Settingsfield Title="Title" Description="Description" Content={<form><input name="test" defaultValue="test" className=""></input></form>} />
          <Settingsfield Title="A longer title that needs more lines" Description="A very long description that will eventually overlap maybe? Unless it goes down. I need to write more text to test this though. Okay." Content={<form><input name="test" defaultValue="test" className=""></input></form>} />


      </div>
    </div>
  )
}

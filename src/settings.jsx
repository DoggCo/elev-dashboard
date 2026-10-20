import { useContext, useEffect, useState } from "react"
import Settingsfield from "./Components/settingsfield"
import check from "./assets/check.svg"
import SetText from "./Components/setText"
import { SettingsList } from "./settingsList"

export default function Settings({ setting, setSetting }) {
  const {
    lon, setLon,
    lat, setLat,
    edu, setEdu,
    bg, setBg,
    github, setGithub
  } = useContext(SettingsList)


  const fuckOff = (e) => {
    e.stopPropagation()
  }
  useEffect(() => {
    const escSettings = (e) => {
      if (e.key === "Escape") {
        setSetting(!setting)
      }
      // IT SHOULDNT FUCKING WORK!!! this is so fucking retarded. signed martin houdek
      // Prevents form from doing default URL submit, this is SUCH a retarded way of doing it
      else if (e.key === "Enter") {
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

        {/* Settingsfield components. Passes a title, description content which is a useState value.
        It has a defaultvalue, and a function which restores default which takes a setter. */}
        <Settingsfield
          Title="Edu navn"
          Description="Edu som er tilknyttet ulike lenker"
          Content={<SetText t={edu} setT={setEdu} />}
          defaultValue="edu0000000"
          onRestore={setEdu}
        />
        <Settingsfield
          Title="Background"
          Description="URL for background on dashboard. GIF virker også."
          Content={<SetText t={bg} setT={setBg} />}
          defaultValue=""
          onRestore={setBg}
        />
        <Settingsfield
          Title="Github"
          Description="Github username"
          Content={<SetText t={github} setT={setGithub} />}
          defaultValue=""
          onRestore={setGithub}
        />
        <Settingsfield
          Title="Temp lon"
          Description="Longitude brukt for værmelding. Default location er Sam Eyde VGS"
          Content={<SetText t={lon} setT={setLon} />}
          defaultValue="8.724792241505867"
          onRestore={setLon}
        />
        <Settingsfield
          Title="Temp lat"
          Description="Latitude brukt for værmelding. Default location er Sam Eyde VGS"
          Content={<SetText t={lat} setT={setLat} />}
          defaultValue="58.48122513472694"
          onRestore={setLat}
        />
      </div>
    </div>
  )
}

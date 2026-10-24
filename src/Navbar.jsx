import { useContext, useState } from "react"
import Settings from "./settings"
import SoundBoxes from "./soundBoxes"
import { SettingsList } from "./settingsList"

export default function Navbar() {
  const {showAudio, setShowAudio, showSettings, setShowSettings} = useContext(SettingsList)
  
  return (
    <>
      <nav className="flex flex-col h-full bg-[#212121] w-1/8 border-r-6 border-[#151515]">
        <div className="flex flex-col">

          <button className="bg-cyan-950 p-3 m-2 text-center rounded-md hover:cursor-pointer"
            onClick={() => setShowSettings(!showSettings)}
          >Settings</button>

          <button className="bg-cyan-950 p-3 m-2 text-center rounded-md hover:cursor-pointer"
            onClick={() => setShowAudio(!showAudio)}
          >Toggle Sounds</button>

        </div>
      </nav>

    </>
  )
}

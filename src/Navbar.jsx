import { useState } from "react"
import Settings from "./settings"

export default function Navbar({edu, setEdu, bg, setBg}) {

  const [setting, setSetting] = useState(false)
  // todo border on right side
  return (
    <>
      <nav className="flex flex-col h-full bg-[#212121] w-1/8 border-r-6 border-[#151515]">
        <div className="flex flex-col">
          <button className="bg-cyan-950 p-3 m-2 text-center rounded-md hover:cursor-pointer"
            onClick={() => setSetting(!setting)}
          >Settings</button>
        </div>
      </nav>

      {setting && <Settings setting={setting} setSetting={setSetting}/>}
    </>
  )
}

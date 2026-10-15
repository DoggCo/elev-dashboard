import { useEffect } from "react"
import Settingsfield from "./Components/settingsfield"

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

      <div className="bg-gray-600 w-5/6 h-5/6 mx-auto my-auto rounded-md overflow-y-auto" onClick={(e) => fuckOff(e)}>

          <Settingsfield Title="Edu navn" Description="Edu som er tilknyttet ulike lenker"
            Content={
              <form>
                <input
                  name="ya" value={edu}
                  onChange={(e) => {
                    e.preventDefault()
                    setEdu(e.target.value)
                  }}
                />
              </form>
            }
          />
          <Settingsfield Title="Background" Description="URL for background on dashboard. GIF virker også."
            Content={
              <form>
                <input
                  name="yeah" value={bg}
                  onChange={(e) => {
                    e.preventDefault()
                    setBg(e.target.value)
                  }}
                />
              </form>
            }
          />

          <Settingsfield Title="Title" Description="Description" Content={<form><input name="test" defaultValue="test" className=""></input></form>} />
          <Settingsfield Title="A longer title that needs more lines" Description="A very long description that will eventually overlap maybe? Unless it goes down. I need to write more text to test this though. Okay." Content={<form><input name="test" defaultValue="test" className=""></input></form>} />


      </div>
    </div>
  )
}

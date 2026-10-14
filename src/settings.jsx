import { useEffect } from "react"
import Settingsfield from "./Components/settingsfield"

export default function Settings({ setting, setSetting, edu, setEdu }) {

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
    <div className="flex h-full w-full absolute bg-[#000000ac] z-1 " onClick={() => setSetting(!setting)}
      onKeyDown={(e) => escSettings(e)}
    >

      <div className="bg-gray-600 w-5/6 h-5/6 mx-auto my-auto rounded-md" onClick={(e) => fuckOff(e)}>

          <Settingsfield Title="Edu navn" Description="Edu som er tilknyttet ulike lenker"
            Content={
              <form>
                <input
                  className="inline-block bg-white text-black m-3"
                  name="dih" value={edu}
                  onChange={(e) => {
                    e.preventDefault()
                    setEdu(e.target.value)
                  }}

                />
              </form>
            }
          />

          <Settingsfield Title="Title" Description="Description" Content={<form><input name="dih" value="dih" className="inline-block bg-white text-black m-3"></input></form>} />


      </div>
    </div>
  )
}

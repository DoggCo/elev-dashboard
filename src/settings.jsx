import { useEffect } from "react"

export default function Settings( {setting, setSetting} ) {

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
    <div className="flex h-full w-full absolute bg-[#000000ac] z-1 " onClick={() => setSetting(!setting)}
      onKeyDown={(e) => escSettings(e)}
    >
      <div className="bg-gray-600 w-5/6 h-5/6 mx-auto my-auto rounded-md" onClick={(e) => fuckOff(e)}>

      </div>
    </div>
  )
}
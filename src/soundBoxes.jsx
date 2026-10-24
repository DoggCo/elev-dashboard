import { useContext, useEffect, useRef, useState } from "react";
import SoundThing from "./Components/soundThing";
import metalGear from "./assets/metalgear.mp3"
import { SettingsList } from "./settingsList";

/*
Plan:
i dont fucking know dude

i need to pass volume, which is the value of the slider.
It needs to start playing audio when the value is above 0

to do this i need to kinda pass the value of the slider back into here, and then pass that into the playAudio function
how do i do this? i dont fucking know :sob: :sob: :sob:
*/

export default function SoundBoxes() {
  const sounds = [
    { id: 1, label: "METAL GEAR!!!!", file: metalGear },
    { id: 2, label: "not metal gear", file: metalGear },
  ]
  return (
    <div className="flex flex-wrap">
      {sounds.map((sound) => (
        <div key={sound.id} className="bg-blue-900 p-3 flex-col flex m-3 rounded-md">
          <SoundDih label={sound.label} soundFile={sound.file} />
        </div>
      ))}
    </div>
  )
}
function SoundDih({ label, soundFile }) {
  const { setIsPlaying } = useContext(SettingsList)

  const audioRef = useRef(new Audio(soundFile));
  const [vol, setVol] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = vol;
    audio.loop = true;

    if (vol > 0) {
      audio.play().catch(err => console.error("Audio Slider:", err));
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [vol])
  return <SoundThing label={label} onVolChange={setVol} />
}
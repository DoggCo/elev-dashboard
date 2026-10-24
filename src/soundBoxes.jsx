import { useEffect, useRef, useState } from "react";
import SoundThing from "./Components/soundThing";
import metalGear from "./assets/metalgear.mp3"

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
    { label: "METAL GEAR!!!!", file: metalGear },
    { label: "not metal gear", file: metalGear },
  ]
  return (
    <div>
      {sounds.map((sound, id) => (
        <SoundDih key={id} label={sound.label} soundFile={sound.file} />
      ))}
    </div>
  )
}
function SoundDih({ label, soundFile }) {
  const audioRef = useRef(new Audio(soundFile));
  const [vol, setVol] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = vol;
    audio.loop = true;

    if (vol > 0) {
      audio.play().catch(err => console.error("Audio Slider:", err));
    } else {
      audio.pause()
    }
  }, [vol])
  return <SoundThing label={label} onVolChange={setVol} />
}
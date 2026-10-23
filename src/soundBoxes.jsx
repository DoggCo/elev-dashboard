import { useState } from "react";
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
  let sound = new Audio(metalGear)
  const [volume, setVolume] = useState(0)

  const playAudio = (audio) => {
    audio.volume = volume;
    audio.play();
  }

  return (
    <div>
      <SoundThing label="hi" sound={playAudio(sound)} volume={volume} />
    </div>
  )
}
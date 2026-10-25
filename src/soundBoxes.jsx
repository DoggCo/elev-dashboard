import { useContext, useEffect, useRef, useState } from "react";
import SoundThing from "./Components/soundThing";
import metalGear from "./assets/metalgear.mp3"
import { SettingsList } from "./settingsList";
import pause from "./assets/pause.svg"
import play from "./assets/play.svg"

export default function SoundBoxes() {
  const { setIsPlaying, isPlaying } = useContext(SettingsList)
  const sounds = [
    { id: 1, label: "METAL GEAR!!!!", file: metalGear },
    { id: 2, label: "not metal gear", file: metalGear },
  ]
  // TODOOOOOO!!! YAY!!! global volume slider somewhere, should it use localstorage? idfk.
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="flex bg-gray-800 rounded-md hover:cursor-pointer w-fit p-3 m-3"
      ><img src={ isPlaying ? pause : play} /></button>
      <div className="flex flex-wrap">
        {sounds.map((sound) => (
          <div key={sound.id} className="bg-blue-900 p-3 flex-col flex m-3 rounded-md">
            <SoundDih label={sound.label} soundFile={sound.file} />
          </div>
        ))}
      </div>
    </div>
  )
}
function SoundDih({ label, soundFile }) {
  const { isPlaying } = useContext(SettingsList)

  const audioRef = useRef(new Audio(soundFile));
  const [vol, setVol] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = vol;
    audio.loop = true;

    if (vol > 0 && isPlaying) {
      audio.play().catch(err => console.error("Audio Slider:", err));
    } else {
      audio.pause()
    }
  }, [vol, isPlaying])
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [])
  return <SoundThing label={label} onVolChange={setVol} />
}
import { useContext, useEffect, useRef, useState } from "react";
import SoundThing from "./Components/soundThing";
import { SettingsList } from "./settingsList";
import birds from "./assets/audio/birds.wav"
import crickets from "./assets/audio/crickets.mp3"
import rain from "./assets/audio/rain.mp3"
import river from "./assets/audio/river.wav"
import wind from "./assets/audio/wind.wav"
import pause from "./assets/pause.svg"
import play from "./assets/play.svg"

export default function SoundBoxes() {
  const { setIsPlaying, isPlaying } = useContext(SettingsList)
  const sounds = [
    { id: 1, label: "Birds", file: birds },
    { id: 2, label: "Crickets", file: crickets },
    { id: 3, label: "Rain", file: rain },
    { id: 4, label: "River", file: river },
    { id: 5, label: "Wind", file: wind },
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
import { useContext, useEffect, useRef, useState } from "react";
import SoundThing from "./Components/soundThing";
import { SettingsList } from "./settingsList";
import pause from "./assets/pause.svg"
import play from "./assets/play.svg"
import { sounds } from "./soundFiles"

export default function SoundBoxes() {
  const { setIsPlaying, isPlaying } = useContext(SettingsList)
  const [masterVol, setMasterVol] = useState(1)

  return (
    <div className="flex flex-col">
      <div className="flex p-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          // Very stupid way of doing margin.
          className="flex bg-gray-800 rounded-md hover:cursor-pointer w-fit p-3 my-3 mr-3"
        ><img src={isPlaying ? pause : play} /></button>
        <div className="bg-blue-900 flex-col p-3 rounded-md">
          <label>Master Volume: {Math.round(masterVol * 100)}%</label>
          <input className="flex"
            id="master-volume"
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={masterVol}
            onChange={(e) => setMasterVol(parseFloat(e.target.value))}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap">
        {sounds.map((sound) => (
          <div key={sound.id} className="bg-blue-900 p-3 flex-col flex m-3 rounded-md">
            <SoundDih label={sound.label} soundFile={sound.file} masterVol={masterVol} max={sound.max} />
          </div>
        ))}
      </div>
    </div>
  )
}
function SoundDih({ label, soundFile, masterVol, max }) {
  const { isPlaying } = useContext(SettingsList)

  const audioRef = useRef(null);
  const [vol, setVol] = useState(0);

  useEffect(() => {
    audioRef.current = new Audio(soundFile);
    audioRef.current.loop = true;

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [soundFile])

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    audio.volume = (vol * max) * masterVol;

    if (vol > 0 && isPlaying) {
      audio.play().catch(err => console.error("Audio Slider:", err));
    } else {
      audio.pause()
    }
  }, [vol, isPlaying, masterVol])
  return <SoundThing label={label} onVolChange={setVol} />
}
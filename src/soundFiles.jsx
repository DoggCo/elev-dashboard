import birds from "./assets/audio/birds.wav"
import crickets from "./assets/audio/crickets.mp3"
import rain from "./assets/audio/rain.mp3"
import river from "./assets/audio/river.wav"
import wind from "./assets/audio/wind.wav"

export const sounds = [
  // max is the maximum percentage volume from a file.
  // audio levels must be normalized manually. get fucked chud.
  { id: 1, label: "Birds", file: birds, max: 0.8 },
  { id: 2, label: "Crickets", file: crickets, max: 1 },
  { id: 3, label: "Rain", file: rain, max: 0.4 },
  { id: 4, label: "River", file: river, max: 0.45 },
  { id: 5, label: "Wind", file: wind, max: 0.4 },
]
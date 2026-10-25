import { useEffect, useState, useContext } from "react"
import { getISOWeek, format } from "date-fns"
import { nb } from "date-fns/locale"
import Infobox from "./Infobox"
import ImgBox from "./imgBox"
import Navbar from "./Navbar"
import { createLinks } from "./links"
import metalGear from "./assets/audio/metalgear.mp3"
import Weather from "./weather"
import { SettingsList } from "./settingsList"
import SoundBoxes from "./soundBoxes"
import Settings from "./settings"

/* 
TODO list

possibly add a background to the infoboxes, saying in the top left something
like "time info" and "weather info". it can take a prop with the title and 
it returns a div with some styling. maybe?

to-do list?

calendar maybe?

that one sound thing from the other repo

a timer

double click reset to actually reset a setting.
undo a reset

*/

export default function Dashboard() {
  const { bg, setBg, edu, github, showAudio, showSettings, setShowSettings, isPlaying } = useContext(SettingsList);

  const [today, setToday] = useState(new Date())
  const [expanded, setExpanded] = useState({});
  const links = createLinks(edu, github);
  const toggleExpanded = (id, value) => {
    setExpanded(prev => ({ ...prev, [id]: value }))
  }
  // Updates the current time every 999 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date())
    }, 999)
    return () => clearInterval(interval)
  }, [])

  // Easter eggs, typing ones.
  useEffect(() => {
    let keys = "cat";
    const bgUrl = "https://www.icegif.com/wp-content/uploads/2024/03/fire-icegif-11.gif"
    const fih = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F31%2Fa7%2F2a%2F31a72afda250825d993400c3ef28c55c.gif"
    const konami = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba"

    let audio = new Audio(metalGear)
    const playMetalGear = () => {
      audio.volume = 0.2
      audio.play()
    }

    const keyPress = (e) => {
      keys += e.key
      if (keys.includes("gTowN")) {
        setBg(bg === bgUrl ? "" : bgUrl)
        keys = ""
      } else if (keys.includes("fiH")) {
        setBg(bg === fih ? "" : fih)
        keys = ""
      } else if (keys.includes(konami)) {
        playMetalGear()
        keys = ""
      }
      if (keys.length > 80) {
        keys = keys.slice(-80);
      }
      keys = keys.replace("Shift", "")
    };
    window.addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  }, [bg])


  // https://date-fns.org/v4.4.0/docs/format
  const weekNum = getISOWeek(today)
  const day = format(today, "EEEE", { locale: nb })
  const month = format(today, "MMMM", { locale: nb })
  const monthNum = format(today, "M", { locale: nb })
  const date = format(today, "P", { locale: nb })
  const clockTime = format(today, "pp", { locale: nb })
  const clockTimeAMPM = format(today, "p")

  const dayButActuallyWrittenLikeASemiNormalHumanBeing = day[0].toUpperCase() + day.slice(1)
  const monthUpper = month[0].toUpperCase() + month.slice(1)

  return (
    // Responsible for layout of page, nav being on left, content being on right
    <div className="flex h-screen">
      <Navbar />
      {showSettings && <Settings setting={showSettings} setSetting={setShowSettings}/>}
      {/* Funny backgrounds.  also https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F31%2Fa7%2F2a%2F31a72afda250825d993400c3ef28c55c.gif */}
      <div
        className="flex-1 overflow-auto bg-no-repeat bg-cover"
        style={{
          backgroundColor: bg === "" ? "#313131" : "transparent",
          backgroundImage: bg !== "" ? `url("${bg}")` : "none"
        }}
      >
        {/* Infoboxes at the top of the page. `justify-center` to center the boxes.*/}
        {/* Uses arrays to pass in content, if it has more than 1 then it inserts a linebreak */}
        <div className="flex flex-wrap">
          <Infobox title="Ukenummer" content={[weekNum]} />
          <Infobox title="Dag" content={[dayButActuallyWrittenLikeASemiNormalHumanBeing]} />
          <Infobox title="Dato" content={[date]} />
          <Infobox title="Måned" content={[monthUpper, `${monthNum} / 12`]} />
          <Infobox title="Klokke" content={[clockTime, clockTimeAMPM]} />
        </div>

        {/* Row of image buttons which send you to a different pages. The links used here are located "./links.jsx" */}
        <div className="flex flex-wrap">
          {links.map(item => (
            <div
              key={item.id}
              className="relative flex flex-col"
              onMouseEnter={() => item.expandable && toggleExpanded(item.id, true)}
              onMouseLeave={() => item.expandable && toggleExpanded(item.id, false)}
            >
              <ImgBox
                link={item.link}
                imgLink={item.imgLink}
              />

              {item.expandable && (
                <div className={`transition-all duration-600 overflow-hidden absolute top-full left-0 z-2 ${expanded[item.id] ? "opacity-100 max-h-128" : "opacity-0 max-h-0"}`}>
                  {item.children.map(child => (
                    <ImgBox
                      key={child.alt}
                      link={child.link}
                      imgLink={child.imgLink}
                      alt={child.alt}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Space for more regular shit here */}
        <div className="flex flex-wrap">
          <Weather />
        </div>

        {showAudio && <SoundBoxes />}
      </div>
    </div>
  )
}
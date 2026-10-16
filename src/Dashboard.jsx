import { getISOWeek, format } from "date-fns"
import { nb } from "date-fns/locale"
import Infobox from "./Infobox"
import { useEffect, useState } from "react"
import ImgBox from "./imgBox"
import Navbar from "./Navbar"
import { Links } from "./links"

/* 
TODO list

add a sidebar navbar.
  - dashboard page
  - settins page, for stuff like edu, background, maybe other stuff?

*/

export default function Dashboard() {
  const [today, setToday] = useState(new Date())
  // Tries to get edu from localstorage and set it into the edu state, if it doesnt exist then "edu" is default
  const [edu, setEdu] = useState(() => {
    const saved = localStorage.getItem("edu")
    return saved || "edu0000000"
  })
  const [bg, setBg] = useState(() => {
    const saved = localStorage.getItem("bg")
    return saved || ""
  })
  const [expanded, setExpanded] = useState({});
  const toggleExpanded = (id, value) => {
    setExpanded(prev => ({ ...prev, [id]: value}))
  }

  // Updates the current time every 999 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date())
    }, 999)
    return () => clearInterval(interval)
  }, [])

  // Updates edu in local storage whenever it gets updated.
  useEffect(() => {
    localStorage.setItem("edu", edu)
  }, [edu])
  useEffect(() => {
    localStorage.setItem("bg", bg)
  }, [bg])
  useEffect(() => {
    let keys = "cat";
    const bgUrl = "https://www.icegif.com/wp-content/uploads/2024/03/fire-icegif-11.gif"
    const keyPress = (e) => {
      keys += e.key
      if (keys.includes("gTowN")) {
        if (bg === bgUrl) {
          setBg("")
          localStorage.setItem("bg", "")
        } else {
          setBg(bgUrl)
          localStorage.setItem("bg", bgUrl)
        }
        keys = ""
      }
      if (keys.length > 40) {
        keys = keys.slice(-40);
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
      <Navbar edu={edu} setEdu={setEdu} bg={bg} setBg={setBg} />
      {/* Funny backgrounds.  also https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F31%2Fa7%2F2a%2F31a72afda250825d993400c3ef28c55c.gif */}
      <div
        className="flex-1 overflow-auto bg-no-repeat bg-cover"
        style={{
          backgroundColor: bg === "" ? "#313131" : "transparent",
          backgroundImage: bg !== "" ? `url("${bg}")` : "none"
        }}
      >
        {/* Infoboxes at the top of the page. `justify-center` to center the boxes.*/}
        <div className="flex flex-wrap">
          <Infobox title="Ukenummer" content={weekNum} />
          <Infobox title="Dag" content={dayButActuallyWrittenLikeASemiNormalHumanBeing} />
          <Infobox title="Dato" content={date} />
          <Infobox title="Måned" content={<>{monthUpper} <br /> {monthNum} / 12</>} />
          <Infobox title="Klokke" content={<>{clockTime} <br /> {clockTimeAMPM} </>} />
        </div>


        {/* Row of image buttons which send you to a different pages. The links used here are located "./links.jsx" */}
        <div className="flex">
          {Links.map(item => (
            <div
              key={item.id}
              className="relative flex flex-col"
              onMouseEnter={() => item.expandable && toggleExpanded(item.id, true)}
              onMouseLeave={() => item.expandable && toggleExpanded(item.id, false)}
            >
              <ImgBox 
                link={typeof item.link === "function" ? item.link(edu) : item.link} 
                imgLink={item.imgLink} 
              />
              
              {item.expandable && (
                <div className={`transition-all duration-600 overflow-hidden absolute top-full left-0 ${expanded[item.id] ? "opacity-100 max-h-128" : "opacity-0 max-h-0"}`}>
                  {item.children.map(child => (
                    <ImgBox
                      key={child.alt}
                      link={typeof child.link === "function" ? child.link(edu) : child.link}
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

      </div>
    </div>
  )
}
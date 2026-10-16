import { getISOWeek, format } from "date-fns"
import { nb } from "date-fns/locale"
import Infobox from "./Infobox"
import { useEffect, useState } from "react"
import ImgBox from "./imgBox"
import outline from "./assets/outline.svg"
import Navbar from "./Navbar"

/* 
TODO list

add a sidebar navbar.
  - dashboard page
  - settins page, for stuff like edu, background, maybe other stuff?

*/

export default function Dashboard() {
  const [today, setToday] = useState(new Date())
  const [microsoftExpanded, setMicrosoftExpanded] = useState(false)
  const [imagderExpanded, setImagderExpanded] = useState(false)
  // Tries to get edu from localstorage and set it into the edu state, if it doesnt exist then "edu" is default
  const [edu, setEdu] = useState(() => {
    const saved = localStorage.getItem("edu")
    return saved || "edu0000000"
  })
  const [bg, setBg] = useState(() => {
    const saved = localStorage.getItem("bg")
    return saved || ""
  })
  const [gtown, setGtown] = useState(false);

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
        if (gtown) {
          setBg(bgUrl)
          localStorage.setItem("bg", bgUrl)
        } else {
          setBg("")
          localStorage.setItem("bg", "")
        }
        setGtown(!gtown)
      }
      if (keys.length > 40) {
        keys = keys.slice(-40);
      }
      keys = keys.replace("Shift", "")
    };
    window.addEventListener("keydown", keyPress);
    return () => window.removeEventListener("keydown", keyPress);
  }, [gtown])


  // https://date-fns.org/v4.4.0/docs/format
  const weekNum = getISOWeek(today)
  const day = format(today, "EEEE", { locale: nb })
  const month = format(today, "MMMM", { locale: nb })
  const monthNum = format(today, "M", { locale: nb })
  const date = format(today, "P", { locale: nb })
  const clockTime = format(today, "pp", { locale: nb })
  const clockTimeAMPM = format(today, "p")

  const proxmoxLink = `https://${edu}.pm.sevgs.no`

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


        {/* Row of image buttons which send you to a different pages */}
        <div className="flex">
          {/* Microsoft button, which expands */}
          <div className="relative flex flex-col" onMouseEnter={() => setMicrosoftExpanded(true)} onMouseLeave={() => setMicrosoftExpanded(false)} >
            <ImgBox link="https://m365.cloud.microsoft/apps" imgLink="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1280px-Microsoft_logo.svg.png" />

            <div className={`transition-all duration-600 overflow-hidden absolute top-full left-0 ${microsoftExpanded ? "opacity-100 max-h-128" : "opacity-0 max-h-0"}`} >
              <ImgBox link="https://word.cloud.microsoft/" alt="word" imgLink="https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/word_24x1.svg" />
              <ImgBox link="https://excel.cloud.microsoft/" alt="excel" imgLink="https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/excel_24x1.svg" />
              <ImgBox link="https://powerpoint.cloud.microsoft/" alt="powerpoint" imgLink="https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/powerpoint_24x1.svg" />
              <ImgBox link="https://outlook.cloud.microsoft/" alt="outlook" imgLink="https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/outlook_24x1.svg" />
            </div>
          </div>

          {/* More regular image buttons */}
          <ImgBox link="https://agder.itslearning.com/CourseCards" imgLink="https://cdn.itslearning.com/v2026.10.1.10336/images/logo-badge.svg" />
          <ImgBox link="https://sameyde-vgs.inschool.visma.no/" imgLink="https://assets.inschool.visma.no/R-7.4.1.2-90e34c83/assets/images-new/favicons/favicon-32x32.png" />

          {/* IMAgder button, which expands */}
          <div className="relative flex flex-col" onMouseEnter={() => setImagderExpanded(true)} onMouseLeave={() => setImagderExpanded(false)}>
            <ImgBox link="https://elev.imagder.no/" imgLink="https://elev.imagder.no/favicon.ico" />

            <div className={`transition-all duration-600 overflow-hidden absolute top-full left-0 ${imagderExpanded ? "opacity-100 max-h-128" : "opacity-0 max-h-0"}`}>
              <ImgBox link="https://gitlab.sevgs.no/" imgLink="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fgitlab-logo-png-transparent.png" />
              <ImgBox link="https://outline.sevgs.no/" imgLink={outline} />
              <ImgBox link={proxmoxLink} imgLink="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proxmox.svg" />
            </div>
          </div>
          {/* More space for regular images buttons here */}

        </div>
        {/* Space for more components here. */}

      </div>
    </div>
  )
}

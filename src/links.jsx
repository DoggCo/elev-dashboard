import outline from "./assets/outline.svg"

export const Links = [
  {
    id: "microsoft",
    imgLink: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1280px-Microsoft_logo.svg.png",
    link: "https://m365.cloud.microsoft/apps",
    expandable: true,
    children: [
      { 
        alt: "word", 
        link: "https://word.cloud.microsoft/", 
        imgLink: "https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/word_24x1.svg" 
      },
      { 
        alt: "excel", 
        link: "https://excel.cloud.microsoft/", 
        imgLink: "https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/excel_24x1.svg" 
      },
      { 
        alt: "powerpoint", 
        link: "https://powerpoint.cloud.microsoft/", 
        imgLink: "https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/powerpoint_24x1.svg" 
      },
      { 
        alt: "outlook", 
        link: "https://outlook.cloud.microsoft/", 
        imgLink: "https://res.cdn.office.net/midgard/versionless/fluentui-resources/4.0.5/assets/brand-icons/product/svg/outlook_24x1.svg" 
      },
    ]
  },
  {
    id: "itslearning",
    link: "https://agder.itslearning.com/CourseCards",
    imgLink: "https://cdn.itslearning.com/v2026.10.1.10336/images/logo-badge.svg"
  },
  {
    id: "visma",
    link: "https://sameyde-vgs.inschool.visma.no/",
    imgLink: "https://assets.inschool.visma.no/R-7.4.1.2-90e34c83/assets/images-new/favicons/favicon-32x32.png"
  },
  {
    id: "imagder",
    imgLink: "https://elev.imagder.no/favicon.ico",
    link: "https://elev.imagder.no/",
    expandable: true,
    children: [
      {
        alt: "gitlab",
        link: "https://gitlab.sevgs.no/",
        imgLink: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fgitlab-logo-png-transparent.png"
      },
      {
        alt: "outline",
        link: "https://outline.sevgs.no/",
        imgLink: outline
      },
      {
        alt: "proxmox",
        link: (edu) => `https://${edu}.pm.sevgs.no`,
        imgLink: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/proxmox.svg"
      },
    ]
  },
];

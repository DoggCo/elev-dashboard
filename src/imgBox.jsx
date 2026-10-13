export default function ImgBox({ imgLink, link }) {
  return (
    <>
      <div className="flex p-3">
        <a href={link} rel="noopener noreferrer" target="_blank" className="border border-solid p-3 bg-mauve-900 w-16 h-16 rounded-md flex items-center justify-center">
          <img src={imgLink} className="w-8"></img>
        </a>
      </div>
    </>
  )
}

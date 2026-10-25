export default function Infobox({ title, content }) {

  return (
    <div className="flex p-3">
      <div className="border border-solid p-3 text-center bg-mauve-900 w-60 min-h-30 rounded-md">
        <h1 className="text-2xl font-bold">—{title}—</h1>
        <br />
        {/* renders content array */}
        <div className="text-2xl">
          {content.map((thing, index) => (
            <div key={index}>
                {thing}
                {/* If array is longer than 1 item, add <br> */}
                {content.length > 1 && index < content.length - 1 && <br />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
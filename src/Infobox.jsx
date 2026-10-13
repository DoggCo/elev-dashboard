export default function Infobox({ title, content }) {
  return (
    <div className="flex p-3">
      <div className="border border-solid p-3 text-center bg-mauve-900 w-60 min-h-30 rounded-md">
        <h1 className="text-2xl font-bold">—{title}—</h1>
        <br/>
        <p className="text-2xl">{content}</p>
      </div>
    </div>
  )
}
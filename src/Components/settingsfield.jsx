export default function Settingsfield({Title, Description, Content}) {
  return (
    <div className="flex align-middle items-center p-3 m-1 odd:bg-gray-500 even:bg-gray-700">
      <h1 className="font-bold w-1/6 text-2xl">{Title}</h1>
      <p className="text-lg">{Description}</p>
      <span className="ml-auto text-lg">{Content}</span>
    </div>
  )
}

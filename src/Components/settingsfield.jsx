export default function Settingsfield({ Title, Description, Content }) {
  return (
    <div className="flex align-middle items-center p-3 m-1 rounded-md odd:bg-gray-500 even:bg-gray-700">
      <h1 className="font-bold w-1/6 text-2xl pr-3">{Title}</h1>
      <p className="text-lg w-7/12 mr-3">{Description}</p>
      <span className="w-3/12 ml-auto text-lg bg-white text-black p-1.5 rounded-md border-0 enabled:outline-none">
        <div className="w-full [&_form]:w-full [&_input]:w-full [&_input]:box-border [&_input]:focus:outline-offset-3">
          {Content}
        </div>
      </span>
    </div>
  )
}

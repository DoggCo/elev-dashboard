export default function SetText({ t, setT }) {
  return (
    <form>
      <input
        name="ya" value={t}
        onChange={(e) => {
          e.preventDefault()
          setT(e.target.value)
        }}
      />
    </form >
  )
}
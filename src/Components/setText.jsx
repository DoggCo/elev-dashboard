export default function SetText({ t, setT }) {
  return (
    <form>
      <input
        name="kofola" value={t}
        onChange={(e) => {
          e.preventDefault()
          setT(e.target.value)
        }}
        
      />
      {/* WHY DOES THIS WORK??? uncomment to have enter do NOTHING, and remove the dogshit from "settings.jsx" */}
      {/*<button type="submit" disabled></button>*/}
    </form >
  )
}
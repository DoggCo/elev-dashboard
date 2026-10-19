import { createContext } from "react";
import useStateHelper from "./Components/useStateHelper";

export const SettingsList = createContext();

export function SettingsProvider({ children }) {
  // The value in localstorage, and a default value.
  // Remember to add new ones to the bottom.
  const [edu, setEdu] = useStateHelper("edu", "edu0000000");
  const [bg, setBg] = useStateHelper("bg", "");
  const [lat, setLat] = useStateHelper("lat", "58.4812")
  const [lon, setLon] = useStateHelper("lon", "8.7248")

  return (
    <SettingsList.Provider value={{ 
        edu, setEdu, 
        bg, setBg, 
        lat, setLat, 
        lon, setLon
        
        }}>
      {children}
    </SettingsList.Provider>
  );
}

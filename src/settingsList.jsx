import { createContext } from "react";
import useStateHelper from "./Components/useStateHelper";

export const SettingsList = createContext();

export function SettingsProvider({ children }) {
  const [edu, setEdu] = useStateHelper("edu", "edu0000000");
  const [bg, setBg] = useStateHelper("bg", "");
  const [lat, setLat] = useStateHelper("lat", "58.48122513472694")
  const [lon, setLon] = useStateHelper("lon", "8.724792241505867")

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

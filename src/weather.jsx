import { useState, useEffect, useContext } from "react";
import Infobox from "./Infobox";
import { SettingsList } from "./settingsList";

export default function Weather() {
  const [weather, setWeather] = useState({})
  const { lon, setLon, lat, setLat } = useContext(SettingsList);

  function getWeatherData() {
    fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&`)
      .then((result) => {
        return result.json();
      }).then((json) => {
        setWeather(json)
      }).catch((error) => {
        console.error("weather problem:", error)
      })
  }
  useEffect(() => {
    if (lat && lon) {
      getWeatherData();
    }
  }, [lat, lon]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "lat") setLat(e.newValue);
      if (e.key === "lon") setLon(e.newValue);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div>
      <Infobox
        title="Temperatur" content={[weather.properties ? (
          <h1>{weather.properties.timeseries[0].data.instant.details.air_temperature}°C</h1>
        ) : (
          <p>Loading.</p>
        )]}
      />
    </div>
  )
}
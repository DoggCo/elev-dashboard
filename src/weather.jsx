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
    const handleStorageChange = (e) => {
      if (e.key === "lat") setLat(e.newValue);
      if (e.key === "lon") setLon(e.newValue);
    };
    if (lat && lon) {
      getWeatherData();
    }
    const interval = setInterval(() => {
      if (lat && lon) {
        getWeatherData();
      }
    }, 60000);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [lat, lon]);


  return (
    <>
      <Infobox
        title="Temperatur" content={[weather.properties ? (
          <>{weather.properties.timeseries[0].data.instant.details.air_temperature}°C</>
        ) : (
          <>Loading.</>
        ),]}
      />
      <Infobox
        title="Vær" content={[weather.properties ? (
          <>{weather.properties.timeseries[0].data.next_1_hours.summary.symbol_code}</>
        ) : (
          <>Loading.</>
        )]}
      />
    </>
  )
}
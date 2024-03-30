import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData(param) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=1457ea67a90832643959ba366656bed1&units=metric`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setWeather(data);
        setLoading(false);
      } else {
        console.log("server error", response);
        setError("City Not Found");
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchData(search);
    setSearch("");
    setError('');
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchData("Addis Ababa");
  }, []);

  console.log(weather);

  return (
    <div>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error !== '' ? (
        <div className="error-input">{error}</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weather?.name}, <span>{weather?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weather?.main?.temp} &deg;c</div>
          <p className="description">
            {weather && weather.weather && weather.weather[0]
              ? weather.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weather?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weather?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

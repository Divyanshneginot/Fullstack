import { useState,useEffect } from "react"
import WeatherData from './services/weather'
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    if (country) {
      const lat = country.capitalInfo.latlng[0]
      const lon = country.capitalInfo.latlng[1]
      WeatherData.get(lat,lon).then(response=>setWeather(response)).catch(error => {
          console.error("Error fetching weather:", error)
        })
    }
  }, [country])
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital ? country.capital[0] : 'None'}</p>
      <p>area: {country.area}</p>
      
      <h2>Languages:</h2>
      <ul>
        {country.languages ? Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        )) : <p>No languages listed</p>}
      </ul>
      <img 
        src={country.flags.png} 
        alt={country.flags.alt || `Flag of ${country.name.common}`} 
        width="150" 
      />
      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="weather icon" 
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}
export default CountryDetails
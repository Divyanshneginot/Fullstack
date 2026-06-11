import { useState, useEffect } from 'react'
import CountriesData from './services/countries.js'
import CountryDetails from './CountryDetails.jsx'
function App() {
  const [countries, setCountries] = useState([])
  const [newName, setNewName] = useState('')
  useEffect(() => {
    CountriesData.getAll('all').then(response => {
      setCountries(response)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(newName.toLowerCase())
  )

  return (
    <>
      <p>
        find countries <input value={newName} onChange={handleNameChange} />
      </p>
      {newName === '' ? (
        <p>Please enter a country to search.</p>
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <CountryDetails country={countriesToShow[0]} />
      ) : (
        countriesToShow.map(country => (
          <p key={country.name.common}>{country.name.common} <button onClick={()=>{setNewName(country.name.common)}}>Show</button></p>
        ))
      )}
    </>
  )
}


export default App
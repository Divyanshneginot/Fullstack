import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message,setMessage]=useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  useEffect(()=>{
    personService.
    getAll().
    then(response=>{
      setPersons(response)
  })
  }, [])
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
 
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          }).catch(error=>{
            setMessage(`Information of ${newName} has been already removed from the server`)
            setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== existingPerson.id))
          })
      }
      return 
    }
    const newperson = {
      name: newName,
      number: newNumber
    }
    
    personService
      .create(newperson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))    
        setNewName('')
        setNewNumber('')
        setMessage(returnedPerson.name)
    setTimeout(() => {
          setMessage(null)
    }, 5000)
      })
    
  }
const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter 
        searchName={searchName} 
        handleSearchChange={handleSearchChange} 
      />
      
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
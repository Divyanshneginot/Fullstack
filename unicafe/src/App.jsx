import { useState } from 'react'
const Statistics=({good,bad,neutral})=>{
  if(good+bad+neutral==0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+bad+neutral}</p>
      <p>average {((good * 1)+(bad * -1))/(good+bad+neutral)}</p>
      <p>positive {(good/(good+bad+neutral)*100)}%</p>
    </div>
  )
}

const App=()=>{
  const [good, setGood] = useState(0)
  const [bad,setBad]=useState(0)
  const [neutral,setNeutral]=useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>{setGood(good+1)}}>good</button>
      <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
      <button onClick={()=>{setBad(bad+1)}}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}

export default App

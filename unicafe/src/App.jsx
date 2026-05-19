import { useState } from 'react'
const StatisticLine=({text,value})=>{
  return(
    <p>{text} {value}</p>
  )
}
const Statistics=({good,bad,neutral})=>{
  if(good+bad+neutral==0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <StatisticLine text={"good"} value={good}></StatisticLine>
      <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
      <StatisticLine text={"bad"} value={bad}></StatisticLine>
      <StatisticLine text={"all"} value={good+bad+neutral}></StatisticLine>
      <StatisticLine text={"average"} value={((good * 1)+(bad * -1))/(good+bad+neutral)}></StatisticLine>
      <StatisticLine text={"positive"} value={((good/(good+bad+neutral)*100)+' %')}></StatisticLine>
    </div>
  )
}
const Button=({onClick,text})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const App=()=>{
  const [good, setGood] = useState(0)
  const [bad,setBad]=useState(0)
  const [neutral,setNeutral]=useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>{setGood(good+1)}} text={'good'}></Button>
      <Button onClick={()=>{setNeutral(neutral+1)}} text={'neutral'}></Button>
      <Button onClick={()=>{setBad(bad+1)}} text={'bad'}></Button>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
  )
}

export default App

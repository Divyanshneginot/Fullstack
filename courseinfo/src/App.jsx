const Header = (course) =>{
  return(
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}
const Part =(partExercise) =>{
  return(
    <div>
      <p>
        {partExercise.name} {partExercise.exercise}
      </p>
    </div>
  )
}
const Content = (course) =>{
  return(
    <div>
      <Part name={course.course.parts[0].name} exercise={course.course.parts[0].exercises}/>
      <Part name={course.course.parts[1].name} exercise={course.course.parts[1].exercises}/>
      <Part name={course.course.parts[2].name} exercise={course.course.parts[2].exercises}/>
    </div>
  )
}
const Total = (parts) => {
  return (
    <div>
      <p>Number of exercises {parts.parts[0].exercises+parts.parts[1].exercises+parts.parts[2].exercises}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content course={course}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
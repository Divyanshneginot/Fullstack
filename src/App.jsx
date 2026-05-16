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
        {partExercise.part} {partExercise.exercise}
      </p>
    </div>
  )
}
const Content = (partExercises) =>{
  return(
    <div>
      <Part part={partExercises.partExercises[0].part0} exercise={partExercises.partExercises[0].exercise0}/>
      <Part part={partExercises.partExercises[1].part1} exercise={partExercises.partExercises[1].exercise1}/>
      <Part part={partExercises.partExercises[2].part2} exercise={partExercises.partExercises[2].exercise2}/>
    </div>
  )
}
const Footer = (partExercises) => {
  return (
    <div>
      <p>Number of exercises {partExercises.partExercises[0].exercise0+partExercises.partExercises[1].exercise1+partExercises.partExercises[2].exercise2}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const partExercises=[
    {part0:'Fundamentals of React',exercise0:10},
    {part1:'Using props to pass data',exercise1:7},
    {part2:'State of a component',exercise2:14}
  ]
  return (
    <div>
      <Header course={course}/>
      <Content partExercises={partExercises}/>
      <Footer partExercises={partExercises}/>
    </div>
  )
}

export default App
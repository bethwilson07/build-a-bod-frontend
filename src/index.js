document.addEventListener("DOMContentLoaded", function () {
  fetchWorkouts()
  fetchExercises()
})

function fetchWorkouts(){
  fetch(`http://localhost:3000/workouts`)
  .then(res => res.json())
  .then(data => {
    //data is an array of cat objects
    data.forEach(workout => {
      let workoutInstance = new Workout(workout.id, workout.name, workout.day,
        workout.muscle_group, workout.duration, workout.exercises)
      document.querySelector('#workoutContainer').appendChild(workoutInstance.render())
    })
  })
}

function fetchExercises(){
  fetch('http://localhost:3000/exercises')
  .then(res => res.json())
  .then(data => {
    data.forEach(exercise => {
      let exerciseInstance = new Exercise(exercise.id, exercise.name, exercise.description,
        exercise.muscle_group, exercise.image, exercise.video)
      document.querySelector('#ExerciseCards').appendChild(exerciseInstance.renderBuffet())
    })
  })
}

document.addEventListener("DOMContentLoaded", function () {
  fetchWorkouts()
  fetchExercises()
  getForm().addEventListener('submit', function(event) {
    createNewWorkout(event)
  })

  let dragged;

  document.addEventListener('drag', function(event) {
    event.dataTransfer.setData("exercise", event.target.id);
  }, false)

  document.addEventListener('dragstart', function(event) {
    dragged = event.target;
  }, false)

  document.addEventListener('dragover', function(event) {
    event.preventDefault();
  }, false)

  document.addEventListener('drop', function(event) {
    event.preventDefault();
    let exerciseId = dragged.id.split('-')[1];
    if (event.target.className.includes("dropzone")) {
      let woId = event.target.dataset.workoutId;
      addExToWorkout(exerciseId, woId)
    } else {
      let woId = dragged.parentNode.id.split('-')[1];
      getWorkoutExerciseId(exerciseId, woId)
      dragged.remove();
    }
  }, false)

})

function getForm() {
  return document.getElementById('newWorkout')
}

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

function createNewWorkout(event) {
  event.preventDefault()
  let nameInput = document.querySelector("#workoutName").value;
  let dayInput = document.querySelector("#workoutDay").value;
  let muscleGroupInput = document.querySelector("#muscleGroup").value;
  let workoutDuration = document.querySelector("#duration").value;

  let data = {
    name: nameInput,
    day: dayInput,
    muscle_group: muscleGroupInput,
    duration:workoutDuration,
    exercises: []
  }

  postWorkout(data);
}

function postWorkout(data) {
  fetch ('http://localhost:3000/workouts', {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then( res => res.json())
  .then( data => {
    console.log(data)
    let workoutInstance = new Workout(data.id, data.name, data.day,
      data.muscle_group, data.duration, data.exercises)
    document.querySelector('#workoutContainer').appendChild(workoutInstance.render())
  })
}
//////////////////////////////

function deleteWorkout(e) {
 let workoutId = e.target.id.split('-')[2]
 let workoutDiv = document.querySelector(`#workout-${workoutId}`)
 workoutDiv.remove();
 deleteFetch(workoutId)

}

function deleteFetch(id) {
 fetch(`http://localhost:3000/workouts/${id}`, {
   method: "DELETE"
 })
}
/////////////////////////////////

function addExToWorkout(exerciseId, woId) {
  let data = {
    workout_id: woId,
    exercise_id: exerciseId
  }
  fetch(`http://localhost:3000/workout_exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let newExercise = document.querySelector(`#exercise-${data.exercise_id}`);
      let exDiv = document.querySelector(`#exercises-${data.workout_id}`);
      newExercise.classList.add('inner-card');
      newExercise.classList.remove('exercise-card');

      exDiv.appendChild(newExercise)

    })

}


function getExerciseData(exId) {

  fetch(`http://localhost:3000/exercises/${exId}`)
    .then(res => res.json())
    .then(exerciseData => {
       addExToWorkout(exerciseData, woId)
    })
}

function getWorkoutExerciseId(exerciseId, woId) {
  fetch(`http://localhost:3000/workout_exercises/`)
  .then(res => res.json())
  .then(workoutExercises => {
    let workoutEx = workoutExercises.find(woEx => {
      return woEx.workout_id == woId && woEx.exercise_id == exerciseId
    })
    deleteWorkoutExercise(workoutEx)
  })
}

function deleteWorkoutExercise(workoutEx) {
  let id = workoutEx.id;
  debugger
  fetch(`http://localhost:3000/workout_exercises/${id}`, {
    method: "DELETE"
  })
}

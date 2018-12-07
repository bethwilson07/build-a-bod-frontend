document.addEventListener("DOMContentLoaded", function () {
  //grabs workouts and exercises from the database
  fetchWorkouts()
  fetchExercises()
  //event listener to create a workout
  getForm().addEventListener('submit', function(event) {
    createNewWorkout(event)
    document.getElementById('newWorkout').reset()
  })
  // Drag and Drop Functionality //

  let dragged; // this variable will store the exercise card that is being dragged

  document.addEventListener('drag', function(event) {
    //sets the drag operations data type
    event.dataTransfer.setData("text", event.target.id);
  }, false)
   //when an exercise starts being dragged the dragged variable is assigned
  document.addEventListener('dragstart', function(event) {
    //assigns the variable dragged to the card being moved
    dragged = event.target;
  }, false)

  document.addEventListener('dragover', function(event) {
    //prevents dragover default to allow a drop
    event.preventDefault();
  }, false)

  document.addEventListener('drop', function(event) {
    //drop default behavior can vary
    event.preventDefault();

    let exerciseId = dragged.id.split('-')[1];


  // this code  checks if the exercise is being dropped on a workout card
    if ((dragged.parentElement.id === 'ExerciseCards' ||
      dragged.parentElement.parentElement.id === 'ExerciseCards')
      &&
      (event.target.parentNode.className.includes("dropzone") ||
      event.target.parentNode.parentNode.className.includes("dropzone"))) {

      let woId;

      if (event.target.hasAttribute('data-workout-id')) {
        woId = event.target.dataset.workoutId;
      } else if (event.target.parentElement.hasAttribute('data-workout-id')) {
        woId = event.target.parentElement.dataset.workoutId;
      } else if (event.target.parentElement.parentElement.hasAttribute('data-workout-id')){
        woId = event.target.parentElement.parentElement.dataset.workoutId;
      }
      addExToWorkout(exerciseId, woId)

// if we are moving an exercise from one workout to another
    } else if (dragged.parentNode.className.includes("dropzone") &&
    (event.target.parentNode.className.includes("dropzone") ||
    event.target.parentNode.parentNode.className.includes("dropzone"))) {

       let oldWoId = dragged.parentNode.id.split('-')[1];//sets the id for the old workout
       let newWoId;//sets the id for the new workout

       if (event.target.hasAttribute('data-workout-id')) {
         newWoId = event.target.dataset.workoutId;
       } else {
         newWoId = event.target.parentElement.parentElement.dataset.workoutId;
       }
       //sets the target where the dragged exercise will be appended
       let targetSpot = document.getElementById(`exercises-${newWoId}`)
       targetSpot.append(dragged)
       getWorkoutExerciseIdForPatch(exerciseId, oldWoId, newWoId)

 // if a exercise is dragged outside of the workout (but not to another workout)
    } else if (dragged.parentNode.parentNode.className.includes("dropzone")){
      let woId = dragged.parentNode.id.split('-')[1];
      getWorkoutExerciseId(exerciseId, woId)
      dragged.remove();
    }
  }, false)
})
// Legacy code for drag and drop  //////////////////////////////////////////////
//     if ((event.target.parentNode.className.includes("dropzone") ||
//     event.target.parentNode.parentNode.className.includes("dropzone"))
//       //this code checks if the exercise is coming from a workout
//      && dragged.parentNode.parentNode.className.includes("dropzone")) {
//        //sets the id for the old workout
//       let oldWoId = dragged.parentNode.id.split('-')[1];
//       //sets the id for the new workout
//       let newWoId;
//       if (event.target.hasAttribute('data-workout-id')) {
//         newWoId = event.target.dataset.workoutId;
//       } else {
//         newWoId = event.target.parentElement.parentElement.dataset.workoutId;
//       }
//       //sets the target where the dragged exercise will be appended
//       let targetSpot = document.getElementById(`exercises-${newWoId}`)
//       targetSpot.append(dragged)
//       getWorkoutExerciseIdForPatch(exerciseId, oldWoId, newWoId)
//
//     // if a workout is dragged from the buffet to a workout
//     } else if (event.target.parentNode.className.includes("dropzone")||
//     event.target.parentNode.parentNode.className.includes("dropzone")) {
//       // let woId;
//       if (event.target.hasAttribute('data-workout-id')) {
//         woId = event.target.dataset.workoutId;
//       } else {
//         woId = event.target.parentElement.parentElement.dataset.workoutId;
//       }
//       addExToWorkout(exerciseId, woId)
//     // if a exercise is dragged outside of the workout (but not to another workout)
//     } else if (dragged.parentNode.parentNode.className.includes("dropzone")){
//       let woId = dragged.parentNode.id.split('-')[1];
//       getWorkoutExerciseId(exerciseId, woId)
//       dragged.remove();
//     }
//   }, false)
//
// })


// DOMContentLoaded ////////////////////////////////////////////////////////////
// populates workouts on to the page when page loads
function fetchWorkouts(){
  fetch(`http://localhost:3000/workouts`)
  .then(res => res.json())
  .then(data => {
    data.forEach(workout => {
      let workoutInstance = new Workout(workout.id, workout.name, workout.day,
        workout.muscle_group, workout.duration, workout.exercises)
      //selects the div where the workouts will be stored
      document.querySelector('#workoutContainer').appendChild(workoutInstance.render())
    })
  })
}

// adds all of the exercise cards to the buffet
function fetchExercises(){
  fetch('http://localhost:3000/exercises')
  .then(res => res.json())
  .then(data => {
    data.forEach(exercise => {
      let exerciseInstance = new Exercise(exercise.id, exercise.name, exercise.description,
        exercise.muscle_group, exercise.image, exercise.video)
      //selects the div where the exercise cards will show and appends a rendered exercise instance
      document.querySelector('#ExerciseCards').appendChild(exerciseInstance.renderBuffet())
    })
  })
}

//selects the new workout form
function getForm() {
  return document.getElementById('newWorkout')
}

// organizes the data for the postWorkout() method
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

// Posts a workout to the database and renders the workout on the DOM
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

// Delete Workout Button ///////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////////////

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

      let newExercise = document.querySelector(`#exercise-${data.exercise_id}`);
      let clone = newExercise.cloneNode(true)
  //bulletproof button removal!
      if (clone.querySelector('button')) {
        let button = clone.querySelector('button')
        button.remove()
      }

      clone.classList.add('inner-card');
      clone.classList.remove('exercise-card');
      let exDiv = document.querySelector(`#exercises-${data.workout_id}`);
      
      exDiv.appendChild(clone)

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

  fetch(`http://localhost:3000/workout_exercises/${id}`, {
    method: "DELETE"
  })
}

function getWorkoutExerciseIdForPatch(exerciseId, oldWoId, newWoId) {
  fetch(`http://localhost:3000/workout_exercises/`)
  .then(res => res.json())
  .then(workoutExercises => {
    let workoutEx = workoutExercises.find(woEx => {
      return woEx.workout_id == oldWoId && woEx.exercise_id == exerciseId
    })
    patchWorkoutExercise(workoutEx, newWoId)
  })
}

function patchWorkoutExercise(workoutEx, newWoId) {
  let id = workoutEx.id;
  let data = {
    workout_id: parseInt(newWoId),
  }
  fetch(`http://localhost:3000/workout_exercises/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
}

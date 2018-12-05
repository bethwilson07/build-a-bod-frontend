class Workout {
  constructor(id, name, day, muscle_group, duration, exercises) {
    this.id = id,
    this.name = name,
    this.day = day,
    this.muscle_group = muscle_group,
    this.duration = duration,
    this.exercises = []

    exercises.forEach(exercise => {
        this.exercises.push(new Exercise(exercise.id, exercise.name,
        exercise.description, exercise.muscle_group, exercise.image, exercise.video))
      })

    Workout.all.push(this)
  }

  render() {
    let div = document.createElement('div');
    div.classList.add('card');
    div.id = `workout-${this.id}`
    div.innerHTML = `
     <h3>${this.name}</h3>
     <p>Day: ${this.day}</p>
     <p>Muscle Group: ${this.muscle_group}</p>
     <p>Duration: ${this.duration} minutes</p>
     <div></div><br>
     <button id="delete-workout">Delete Workout</button> `


      this.exercises.forEach(exercise => {
      div.querySelector('div').appendChild(exercise.renderExercise())
      })
      // 
      // let delBtn = document.querySelector("#delete-workout")
      // debugger
      // delBtn.addEventListener('click', function(e) {
      //   debugger
      //   deleteWorkout(e)
      // })

    return div;
  }
}

Workout.all = []

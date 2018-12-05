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

    let name = document.createElement('h3')
    name.innerText = `${this.name}`

    let day = document.createElement('p')
    day.innerText = `${this.day}`

    let muscleGroup = document.createElement('p')
    muscleGroup.innerText = `Muscle Group: ${this.muscle_group}`

    let duration = document.createElement('p')
    duration.innerText = `${this.duration} minutes`

    let exercises = document.createElement('div')

    let deleteButton = document.createElement('button')
    deleteButton.id = 'delete-workout'
    deleteButton.innerText = 'Delete Workout'

    div.append(name, day, muscleGroup, duration, exercises, deleteButton)

      this.exercises.forEach(exercise => {
      exercises.appendChild(exercise.renderExercise())
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

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
    div.classList.add('dropzone')

    let name = document.createElement('h3')
    name.innerText = `${this.name}`
    name.classList.add('dropzone')

    let day = document.createElement('p')
    day.innerText = `${this.day}`
    day.classList.add('dropzone')

    let muscleGroup = document.createElement('p')
    muscleGroup.innerText = `Muscle Group: ${this.muscle_group}`
    muscleGroup.classList.add('dropzone')

    let duration = document.createElement('p')
    duration.innerText = `${this.duration} minutes`
    duration.classList.add('dropzone')

    let exercises = document.createElement('div')
    exercises.id = `exercises`
    exercises.classList.add('dropzone')

    let deleteButton = document.createElement('button')
    deleteButton.id = `delete-workout-${this.id}`
    deleteButton.innerText = 'Delete Workout'

    deleteButton.addEventListener('click', function(e) {
      deleteWorkout(e)
    })

    div.append(name, day, muscleGroup, duration, exercises, deleteButton)

      this.exercises.forEach(exercise => {
      exercises.appendChild(exercise.renderExercise())
      })

    return div;
  }
}

Workout.all = []

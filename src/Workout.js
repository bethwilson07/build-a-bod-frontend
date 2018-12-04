class Workout {
  constructor(id, name, day, muscle_group, duration) {
    this.id = id,
    this.name = name,
    this.day = day,
    this.muscle_group = muscle_group,
    this.duration = duration,
    this.exercises = []

    // this.exercises.forEach(exercise => {
    //     this.exercises.push(new Exercise(exercise.id, exercise.name,
    //     exercise.description, exercise.muscle_group, exercise.image, exercise.video))
    //   })

    Workout.all.push(this)
  }

  render() {
    let div = document.createElement('div');
    div.classList.add('card');
    div.id = `workout-${this.id}` //undefined
    div.innerHTML = `
     <h3>${this.name}</h3>
     <p>Day: ${this.day}</p>
     <p>Muscle Group: ${this.muscle_group}</p>
     <p>Duration: ${this.duration} minutes</p>
     <ul>Exercises:</ul>
       `
      // this.exercises.forEach(exercise => {
      // workoutDiv.querySelector('ul').appendChild(exercise.render())
    // })

    return div
  }
}

Workout.all = []

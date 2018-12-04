class Exercise {
  constructor(id, name, description, muscle_group, image, video) {
    this.id = id,
    this.name = name,
    this.description = description,
    this.muscle_group = muscle_group,
    this.image = image,
    this.video = video
  }

  renderExercise() {
    let div = document.createElement('div')
    div.id = `exercise-${this.id}`
    div.classList.add('inner-card')
    div.innerHTML = `
    <h4>${this.name}</h4>
    <img class="exercise-photo" src=${this.image} />
    `
    return div;
  }

  renderBuffet() {
    let div = document.createElement('div')
    div.id = `exercise-${this.id}`
    div.classList.add('exercise-card')
    div.innerHTML = `
    <h4>${this.name}</h4>
    <img class="exercise-photo" src=${this.image} />
    `
    return div;
  }

}

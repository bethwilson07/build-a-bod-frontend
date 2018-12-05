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
    div.draggable = "true"
    div.id = `exercise-${this.id}`
    div.classList.add('inner-card')

    let nameEl = document.createElement('h4');
    nameEl.innerText = `${this.name}`

    let exImg = document.createElement('img')
    exImg.className = "exercise-photo"
    exImg.draggable = "false"
    exImg.src = `${this.image}`

    div.append(nameEl, exImg)
    return div;
  }

  renderBuffet() {
    let div = document.createElement('div')
    div.draggable = "true"
    div.id = `exercise-${this.id}`

    div.classList.add('exercise-card')
    div.innerHTML = `
    <h4>${this.name}</h4>
    <img class="exercise-photo" draggable="false" src=${this.image} />
    `
    return div;
  }

}

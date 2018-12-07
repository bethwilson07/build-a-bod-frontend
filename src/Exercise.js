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
    exImg.draggable = false;
    exImg.src = `${this.image}`

    div.append(nameEl, exImg)
    return div;
  }

  renderBuffet() {
    let div = document.createElement('div')
    div.draggable = "true"
    div.id = `exercise-${this.id}`
    div.classList.add('exercise-card')

    let exName = document.createElement('h4')
    exName.innerText = `${this.name}`


    let descrBtn = document.createElement('button');
    descrBtn.className = "ui blue basic button"
    descrBtn.classList.add("exBtn")
    descrBtn.innerText = "Description"

    let descrP = document.createElement('p')
    descrP.className = "description"
    descrP.innerText = `${this.description}`

    let goBackBtn = document.createElement('button');
    goBackBtn.className = "ui blue basic button"
    goBackBtn.innerText = `Back`

    goBackBtn.addEventListener('click', function (e){
      div.innerHTML = ""
      div.append(exName, exImg, descrBtn)
    })

    descrBtn.addEventListener('click', function (e) {
        div.innerHTML = ""
        div.append(exName, descrP, goBackBtn)
    })

    let exImg = document.createElement('img')
    exImg.className = "exercise-photo"
    exImg.draggable = "false"
    exImg.src = `${this.image}`

    div.append(exName, exImg, descrBtn)

    return div;
  }

}

class Exercise {
  constructor(id, name, description, muscle_group, image, video) {
    this.id = id,
    this.name = name,
    this.description = description,
    this.muscle_group = muscle_group,
    this.image = image,
    this.video = video
  }
  //this method is used to render exercises in a workout (has name and photo)
  renderExercise() {
    //creates a draggable div for a exercise
    let div = document.createElement('div')
    div.draggable = "true"
    div.id = `exercise-${this.id}`
    div.classList.add('inner-card')
    //displays the exercise name
    let nameEl = document.createElement('h4');
    nameEl.innerText = `${this.name}`
    //adds an exercise image and overrides image drag ability (a default)
    let exImg = document.createElement('img')
    exImg.className = "exercise-photo"
    exImg.draggable = false;
    exImg.src = `${this.image}`
    //adds the name element and the image element to the exercise div
    div.append(nameEl, exImg)
    return div;
  }

  //this method is used to render exercises in the exercise buffet
  renderBuffet() {
    let div = document.createElement('div')
    div.draggable = "true"
    div.id = `exercise-${this.id}`
    div.classList.add('exercise-card')

    let exName = document.createElement('h4')
    exName.innerText = `${this.name}`

    let exImg = document.createElement('img')
    exImg.className = "exercise-photo"
    exImg.draggable = false
    exImg.src = `${this.image}`

    //button that replaces picture area with exercise description
    let descrBtn = document.createElement('button');
    descrBtn.className = "ui black basic button"
    descrBtn.classList.add("exBtn")
    descrBtn.innerText = "Description"

    //exercise description
    let descrP = document.createElement('p')
    descrP.className = "description"
    descrP.innerText = `${this.description}`

    //button that reverts description back to photo
    let goBackBtn = document.createElement('button');
    goBackBtn.className = "ui black basic button"
    goBackBtn.innerText = `Back`

    //event listeners for the buttons
    goBackBtn.addEventListener('click', function (e){
      div.innerHTML = ""
      div.append(exName, exImg, descrBtn)
    })

    descrBtn.addEventListener('click', function (e) {
        div.innerHTML = ""
        div.append(exName, descrP, goBackBtn)
    })

    //renders default view
    div.append(exName, exImg, descrBtn)

    return div;
  }

}

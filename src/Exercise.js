class Exercise {
  constructor(id, name, description, muscle_group, image, video) {
    this.id = id,
    this.name = name,
    this.description = description,
    this.muscle_group = muscle_group,
    this.image = image,
    this.video = video
  }

  // render() {
  //
  //   fetch('http://localhost:3000/exercises')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //
  //   let li = document.createElement('li')
  //   li.innerHTML = `
  //   <h4>${this.name}</h4>
  //   <p>Description: ${this.description}</p>
  //   <p>Muscle Group: ${this.muscle_group}</p>
  //   <img alt=${this.name} src=${this.image} />
  //   `
  //   return li;
  //
  // }

}

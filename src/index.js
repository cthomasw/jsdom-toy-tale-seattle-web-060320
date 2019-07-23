const allToysUrl = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function loadEmUp(allToysUrl) {
  return fetch(allToysUrl)
  .then(res => res.json())
  .then(data => displayAllToys(data))
}

function displayAllToys(data) {
  for (let i = 0; i < data.length; i++) {
    const toy = data[i];
    createToyCard(toy)
  }
}

function createToyCard(toy) {
  let toyCol = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  toyCard.appendChild(h2)
  let toyImg = document.createElement('img')
  toyImg.className = 'toy-avatar'
  toyImg.src = toy.image
  toyCard.appendChild(toyImg)
  let toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`
  toyCard.appendChild(toyLikes)
  let likeMe = document.createElement('button')
  likeMe.innerText = 'Like me!'

  likeMe.addEventListener('click', function(ev) {
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: toy.likes+1,
        id: toy.id
      })
    })
  })
  toyCard.appendChild(likeMe)
  toyCol.appendChild(toyCard)
}

function addNewToy() {
  let newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', createAToy)
}

function createAToy(ev) {
  ev.preventDefault()
  let name = ev.target.name.value
  let image = ev.target.image.value
  fetch(allToysUrl, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  }).then(res => res.json())
}



function main() {
  loadEmUp(allToysUrl)
  addNewToy()
}

main();
document.addEventListener('DOMContentLoaded', (event) => {
  // console.log('DOM fully loaded and parsed');
});
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


function pageLoad() {
  const toyUrl = 'http://localhost:3000/toys'
  return fetch(toyUrl)
    .then(res => res.json())
    .then(data => getToys(data))
}

function getToys(data) {
  // console.log(data)
  for (let i = 0; i < data.length; i++) {
    const toy = data[i];
    displayToy(toy)
  }
}

function displayToy(toy) {
  // console.log(toy)
  let toyCollection = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  toyCard.appendChild(h2)
  let toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  toyCard.appendChild(toyImg)
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  toyCard.appendChild(p)
  let likeButton = document.createElement('button')
  likeButton.className = 'button'
  likeButton.innerText = 'Like Me!'
  likeButton.addEventListener('click', function(ev) {
    ev.preventDefault()
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: toy.id,
        name: toy.name,
        image: toy.image,
        likes: toy.likes + 1
      })
    })
  })  
  toyCard.appendChild(likeButton)
  toyCollection.appendChild(toyCard)
}

function addNewToy() {
  let newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', createToy)
}

function createToy(ev) {
  ev.preventDefault()
  let newToyName = ev.target[0].value
  let newToyImg = ev.target[1].value
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImg,
      likes: 0
    })
  })
}

function main() {
  pageLoad()
  addNewToy()

}

main()
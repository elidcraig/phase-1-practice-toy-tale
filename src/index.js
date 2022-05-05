let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const newToyForm = document.querySelector('.add-toy-form')
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionContainer = document.querySelector('#toy-collection')

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toysArr => toysArr.forEach(toyObj => renderOneCard(toyObj)))

  function createNewToy() {
    const newToyObj =  {
      name: newToyForm.name.value,
      image: newToyForm.image.value,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToyObj)
    })
    .then(resp => resp.json())
    .then( () => renderOneCard(newToyObj))
    .catch( () => alert('There was a problem processing your request'))
  }

  function renderOneCard(toyObj) {
    
    const toyCard = document.createElement('div')
    const toyHeader = document.createElement('h2')
    const toyImage = document.createElement('img')
    const toyLikes = document.createElement('p')
    const likeButton = document.createElement('button')

    toyCard.className = 'card'
    toyImage.className = 'toy-avatar'
    likeButton.className = 'like-btn'
    likeButton.id = toyObj.id

    toyHeader.textContent = toyObj.name 
    toyImage.src = toyObj.image 
    toyLikes.textContent = `${toyObj.likes} Likes`
    likeButton.textContent = 'Like ♥️'

    likeButton.addEventListener('click', e => {
      toyId = e.target.id
      let likesCounter = toyObj.likes + 1
      increaseLikeCounter(toyId, likesCounter)
    })

    toyCard.appendChild(toyHeader)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(likeButton)
    toyCollectionContainer.appendChild(toyCard)
  }

  function increaseLikeCounter(toyId, newLikes) {
    console.log(toyId, newLikes)
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
    .then(resp => resp.json())
    .then()
    .catch( () => alert('Something went wrong...'))
  }

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })

  newToyForm.addEventListener('submit', e => {
    e.preventDefault()
    createNewToy()
    newToyForm.reset()
  })

})


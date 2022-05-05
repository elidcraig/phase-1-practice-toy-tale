let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionContainer = document.querySelector('#toy-collection')

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toysArr => toysArr.forEach(toyObj => renderOneCard(toyObj)))

  function renderOneCard(toyObj) {
    console.log(toyObj)
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});

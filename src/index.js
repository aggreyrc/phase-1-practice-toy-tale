let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  //Event Listeners
  document.querySelector(".add-toy-form").addEventListener("submit", handleSubmit)
  
  //Event Handlers
  function handleSubmit(e){
    e.preventDefault()
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    createToyCard(toyObj)
    addNewToy(toyObj)
  }

  const toyCollection = document.getElementById("toy-collection")
  
  //create toy card
  function createToyCard(toy){
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id = ${toy.id}> ❤️ </button>`

    toyCard.querySelector(".like-btn").addEventListener("click", () => {
      toy.likes += 1
      toyCard.querySelector("p").textContent = toy.likes
      updateLikes(toy);
    })

    //Add toy to DOM
    toyCollection.appendChild(toyCard);

  }

  //Fetch Requests
  //Fetch all toys
  function getAllToys(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => toys.forEach(toy => createToyCard(toy)))
  }

  //Add a new toy
  function addNewToy(toyObj){
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyObj),
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }
  
  //updating Likes
  function updateLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyObj),
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

  function initialize(){
    getAllToys()
    //toys.forEach(toy => createToyCard(toy));
  }
  initialize();
});

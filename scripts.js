const cardArea = document.getElementById("dog-add-remove-area")
const dogAddButton = document.getElementById("dog-add-btn")
const dogRemoveButton = document.getElementById("dog-remove-btn")
const dogUpdateButton = document.getElementById("dog-update-btn")

// Dog addition dialog elements
const dialogElement = document.getElementById("dialog")
const addDogFormEl = document.getElementById("dog-add-form")

const addDogbtn = document.getElementById("dog-add-btn")


// Dog removal dialog elements
const dogRemovalDialogEl = document.getElementById("dog-removal-confirmation-dialog")
const dogRemovalDialogYesBtn = document.getElementById("dog-removal-confirmation-yes-button")
const dogRemovalDialogNoBtn = document.getElementById("dog-removal-confirmation-no-button")

const ourDogs = []

let dogsName = document.querySelector("#dogs-name-input")
let dogsBirthday = document.querySelector("#dogs-birthday-input")
let dogsBreed = document.querySelector("#dogs-breed-input")
let dogNotes = document.querySelector("#dog-notes-input")

const cardSubmitbtn = document.querySelector("#submit-btn")

// Create prototype for dogs

function Dog(name, birthday, breed, notes) {
    this.name = name;
    this.birthday = new Date(birthday)
    this.age = function ageCalc(birthday){};
    this.breed = breed;
    this.notes = notes;
}

// Function to create a new card on the card summary page for a dog

Dog.prototype.makeCard = function(index) {

    const dogIndex = ourDogs[index]

    const dogArray = [this.name, this.breed, this.notes]
    const newDogCard = document.createElement('div')
    newDogCard.classList.add("summary-cards")
    newDogCard.setAttribute('data-index', index)
    
    const removeDogbtn = document.createElement('button')
    removeDogbtn.setAttribute('data-index', index)
    removeDogbtn.setAttribute('class', 'dog-remove-btn')
    removeDogbtn.textContent = "Remove Dog"
    
    for (let i = 0; i < dogArray.length; i++) {
        let listItem = document.createElement('li')
        listItem.textContent = dogArray[i]
        newDogCard.appendChild(listItem)
    }
    
    newDogCard.appendChild(removeDogbtn)
    cardArea.appendChild(newDogCard)

    removeDogbtn.addEventListener('click', showDogRemovalConfirmation)
}



// Dog card management functions

addDogbtn.addEventListener('click', () => {
    dialogElement.showModal()
})

function refreshCards() {
    while (cardArea.firstChild) {
        cardArea.removeChild(cardArea.firstChild)
    }
}

// Adds a dog object to our dogs array then loops to display them all



cardSubmitbtn.addEventListener('click', (event) => {
    event.preventDefault()
    let dog = new Dog(dogsName.value, "2020-01-01", dogsBreed.value, dogNotes.value)
    ourDogs.push(dog)
    refreshCards()
    dialogElement.close()
    addDogFormEl.reset()
    displayDogs()
})

function displayDogs() {
    for (let i = 0; i < ourDogs.length; i++) {
        ourDogs[i].makeCard(i)
    }
}

function removeDogClickHandler() {
    const confirmed = window.confirm("Are you sure you want to remove this dog?")

    if (confirmed) {
    
    const currentDogIndex = this.getAttribute('data-index')
    ourDogs.splice(currentDogIndex, 1)
    refreshCards()
    displayDogs()
}}

function showDogRemovalConfirmation() {
    dogRemovalDialogEl.showModal()
    dogRemovalDialogYesBtn.setAttribute('data-index', this.getAttribute('data-index'))
    dogRemovalDialogYesBtn.addEventListener('click', handleDogRemovalConfirmation)
    dogRemovalDialogNoBtn.addEventListener('click', handleDogRemovalNotConfirmed)
}

function handleDogRemovalConfirmation() {
    const currentDogIndex = this.getAttribute('data-index')
    ourDogs.splice(currentDogIndex, 1)
    dogRemovalDialogEl.close()
    refreshCards()
    displayDogs()
}

function handleDogRemovalNotConfirmed() {
    dogRemovalDialogEl.close()
}

/* ************************* Test Area *********************** */

// dogRemovalDialogEl.showModal()


// let dog1 = new Dog("Jazzy", "2014-03-02", "Big Bellied Potato Shark", "This is a sweet baby")
// let dog2 = new Dog("Odin", "2019-01-01", "Comedian", "Such a silly velvet pastrami")

// function(e) {
//     const dogDataIndex = this.getAttribute('data-index')
//     ourDogs.splice(dogDataIndex)
//     refreshCards()
//     displayDogs()
// }
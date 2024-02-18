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

// Dog addition form input elements
let dogsName = document.querySelector("#dogs-name-input")
let dogsBirthday = document.querySelector("#dogs-birthday-input")
let dogsBreed = document.querySelector("#dogs-breed-input")
let dogNotes = document.querySelector("#dog-notes-input")
let dogBoardingStatus = document.querySelector("#dog-inhouse-status")

const cardSubmitbtn = document.querySelector("#submit-btn")

// Create prototype for dogs

function Dog(name, birthday, breed, notes, inhouseStatus) {
    this.name = name;
    this.birthday = new Date(birthday)
    this.birthdayDay = this.birthday.getDate()
    this.birthdayMonth = this.birthday.getMonth()
    this.birthdayYear = this.birthday.getFullYear()
    this.displayBirthday = function() {
        return `${this.birthdayMonth}-${this.birthdayDay}-${this.birthdayYear}`
    }
    this.age = function() {
        let today = new Date()

        let birthdayYear = this.birthday.getFullYear()
        let todayYear = today.getFullYear()
        
        let birthdayMonth = this.birthday.getMonth()
        let todayMonth = today.getMonth()

        let yearsOld = todayYear - birthdayYear
        let monthsOld = todayMonth - birthdayMonth

        let calculatedAgeInMonths = (todayYear - birthdayYear) * 12 + (monthsOld)

        let calculatedYears = Math.floor(calculatedAgeInMonths / 12)
        let calculatedMonths = Math.floor(calculatedAgeInMonths - (calculatedYears * 12))
        
        return `${calculatedYears} years and ${calculatedMonths} months old`
    };
    this.breed = breed;
    this.notes = notes;
    this.inhouseStatus = inhouseStatus
}

// Function to create a new card on the card summary page for a dog

Dog.prototype.makeCard = function(index) {

    const dogIndex = ourDogs[index]
    let dogAge = this.age()
    let displayedBirthday = this.displayBirthday()
    const dogArray = [this.name, displayedBirthday, dogAge, this.breed, this.notes, this.inhouseStatus]
    const newDogCard = document.createElement('div')
    newDogCard.classList.add("summary-cards")
    newDogCard.setAttribute('data-index', index)
    
    const removeDogbtn = document.createElement('button')
    removeDogbtn.setAttribute('data-index', index)
    removeDogbtn.setAttribute('class', 'dog-remove-btn')
    removeDogbtn.textContent = "Remove Dog"

    const dogGuestStatus = document.createElement('button')
    dogGuestStatus.setAttribute('data-index', index)
    dogGuestStatus.setAttribute('class', 'dog-guest-status')
    dogGuestStatus.textContent = "Change guest status"
    
    for (let i = 0; i < dogArray.length; i++) {
        let listItem = document.createElement('li')
        listItem.textContent = dogArray[i]
        newDogCard.appendChild(listItem)
    }
    
    newDogCard.appendChild(removeDogbtn)
    newDogCard.appendChild(dogGuestStatus)
    cardArea.appendChild(newDogCard)

    removeDogbtn.addEventListener('click', showDogRemovalConfirmation)
    dogGuestStatus.addEventListener('click', changeDogGuestStatus)
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
    let dog = new Dog(dogsName.value, dogsBirthday.value, dogsBreed.value, dogNotes.value, dogBoardingStatus.value)

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

function changeDogGuestStatus() {
    let currentDogIndex = this.getAttribute('data-index')
    let currentDog = ourDogs[currentDogIndex]

    if (currentDog.inhouseStatus === "Currently a guest") {
        currentDog.inhouseStatus = "Not currently a guest"
        refreshCards()
        displayDogs()
    } else {
        currentDog.inhouseStatus = "Currently a guest"
        refreshCards()
        displayDogs()
    }

}


/* ************************* Test Area *********************** */



// dogRemovalDialogEl.showModal()


// let dog1 = new Dog("Jazzy", "2014-03-02", "Big Bellied Potato Shark", "This is a sweet baby", true)

// console.log(dog1.age())

// let dog2 = new Dog("Odin", "2019-01-01", "Comedian", "Such a silly velvet pastrami")

// function(e) {
//     const dogDataIndex = this.getAttribute('data-index')
//     ourDogs.splice(dogDataIndex)
//     refreshCards()
//     displayDogs()
// }
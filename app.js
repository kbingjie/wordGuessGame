const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");
const hintBtn = document.getElementById("hint");
const toolTip = document.querySelector(".tool-tip");

const words = ['dog', 'complex', 'cat', 'meow', 'application'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


//Show hidden word
function displayWord() {
    let splitedWord = selectedWord.split("");
    let mapWord = splitedWord.map(letter => {
        if (correctLetters.includes(letter)) {
            return `<span class="letter">${letter}</span>`;
        } else {
            return `<span class="letter"></span>`;
        }
    })
    wordEl.innerHTML = mapWord.join("");
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You won!";
        popup.style.display = "flex";
    }
}

//Update the wrong letters
function updateWrongLetters() {
    // wrongLetters.innerHTML = `
    // ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ""}
    // ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    // `;
    //Display wrong letters
    wrongLettersEl.innerHTML = "<p>Wrong</p>";
    let wrong = "";
    if (wrongLetters.length > 0) {
        wrongLetters.forEach(letter => {
            wrong += `<span>${letter},</span>`;
        })
        wrongLettersEl.innerHTML += wrong;
    }
    //Display man figure
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    })

    //Check if lost 
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Sorry, You lost! Try again!";
        popup.style.display = "flex";
    }
}

//Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 1000);
}

//Keydown letter press
document.addEventListener("keydown", e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (correctLetters.includes(letter)) {
                showNotification();
            } else {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (wrongLetters.includes(letter)) {
                showNotification();
            } else {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
})

//Play again
playAgainBtn.addEventListener("click", () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetters();
    popup.style.display = "none";
    hintBtn.disabled = false;
})

//Hint button
hintBtn.addEventListener("click", () => {
    const words = selectedWord.split("");
    for (let i = 0; i < words.length; i++) {
        if (!correctLetters.includes(words[i])) {
            correctLetters.push(words[i]);
            break;
        }
    }
    hintBtn.disabled = true;
    toolTip.style.visibility = "hidden";
    displayWord();
})

displayWord();

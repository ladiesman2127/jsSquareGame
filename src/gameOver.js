import { changeDifficulty, reauth, generateButton, getUser} from "./generators.js"
const resultForm = document.querySelector('.resultContainer');
const showResults = () => {
    const users = JSON.parse(localStorage.getItem('users'))
    users.forEach((user) => {
    let userStats = JSON.parse(localStorage.getItem(user))
    resultForm.innerText += userStats._login + ': ' + userStats._record + '\r\n'
})
    addButtons()
}
const addButtons = () => {
    const newGameButton = generateButton("Сыграть снова",'60%','10%')
    newGameButton.addEventListener('click', () => {
        changeDifficulty()
    })
    newGameButton.style.top = '25%'
    const reauthButton = generateButton("Выйти",'60%','10%')
    reauthButton.addEventListener('click', () => {
        reauth()
    })
    resultForm.appendChild(newGameButton)
    resultForm.appendChild(reauthButton)
}
const updateLocalStorage = () => {
    const currentUser = getUser()
    currentUser._points = 0
    localStorage.setItem(currentUser._login, JSON.stringify(currentUser))
}
showResults()
updateLocalStorage()


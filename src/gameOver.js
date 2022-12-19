
const getUser          = (username = localStorage.getItem('currentUser')) => 
                                            {return JSON.parse(localStorage.getItem(username))}
const changeDifficulty = ()        => {window.location.href = './levelConfig.html'}
const reauth           = ()        => {window.location.href = './index.html'}
const generateButton = (name, width = '200px', height='50px') => {
    let button                   = document.createElement('button')
    button.style.position        = 'relative'
    button.style.borderRadius    = '10px'
    button.style.width           = width
    button.style.height          = height
    button.style.fontSize        = '2rem'
    button.style.margin          = '10px'
    button.style.transition      = '0.2s'
    button.style.backgroundColor = 'white'
    button.textContent           = name
    button.addEventListener('mouseenter', () => {
        button.style.cursor      = 'pointer'
        button.style.transform   = 'scale(1.2)'
    })
    button.addEventListener('mouseleave', () => {
        button.style.transform   = 'scale(1)'
    })
    return button
}

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


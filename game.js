const getUser          = ()        => {return JSON.parse(localStorage.getItem(localStorage.getItem('currentUser')))}
const changeDifficulty = ()        => {window.location.href = './levelConfig.html'}
const reauth           = ()        => {window.location.href = './index.html'}
const gameOver         = ()        => {window.location.href = './gameOver.html'}
const update           = ()        => {window.location.reload()}
const getRandomColor   = (Colors)  => {return Colors[Math.floor(Math.random() * Colors.length)]}
const calculateWidth   = (size)    => {return 100/size}
const calculateHeight  = (size)    => {return 100/size}
const getRandomPuzzle  = (puzzles) => {return puzzles[Math.floor(Math.random() * puzzles.length)]}

const generatePointsLabel = (points) => {
    let pointsLabel            = document.createElement('div')
    pointsLabel.textContent    = 'Очки: ' + points
    pointsLabel.id             = 'points'
    pointsLabel.style.position = 'relative'
    pointsLabel.style.width    = '50%'
    pointsLabel.style.height   = 'auto'
    pointsLabel.style.fontSize = '2rem'
    pointsLabel.style.color    = 'white'
    pointsLabel.classList.add('points')
    window.addEventListener('resize', (e) => {
        pointsLabel.style.width = '50%'
    }, true)
    return pointsLabel
}

const generateTimerLabel = (startTime) => {
    let timerLabel            = document.createElement('div')
    timerLabel.textContent    = "Таймер: " + startTime
    timerLabel.style.position = 'relative'
    timerLabel.style.width    = '70%'
    timerLabel.style.height   = 'auto'
    timerLabel.style.fontSize = '2rem'
    timerLabel.style.color    = 'white'
    timerLabel.classList.add('timer')
    window.addEventListener('resize', (e) => {
        timerLabel.style.width = '50%'
    }, true)
    return timerLabel
}

const generateAttemptsLabel = (attempts) => {
    let attemptsLabel            = document.createElement('div')
    attemptsLabel.id             = 'attempts'
    attemptsLabel.style.position = 'relative'
    attemptsLabel.style.width    = '50%'
    attemptsLabel.style.height   = 'auto'
    attemptsLabel.style.fontSize = '2rem'
    attemptsLabel.textContent    = 'Попытки: ' + attempts
    attemptsLabel.style.color    = 'white'
    attemptsLabel.classList.add('attempts')
    window.addEventListener('resize', (e) => {
        attemptsLabel.style.width = '50%'
    }, true)
    return attemptsLabel
}

const generateBox =  (width, height) => {
    let box                  = document.createElement("div")
    box.style.opacity        = '90%'
    box.style.display        = 'flex'
    box.style.flexWrap       = 'wrap'
    box.style.justifyContent = 'center'
    box.style.alignItems     = 'center'
    box.style.position       = 'relative'
    box.style.borderCollapse = 'collapse'
    box.style.width          = width + "%"
    box.style.height         = height + "%"
    box.classList.add("box")
    return box
}

const generateColoredBox =  (width, height, color) => {
    let box                   = document.createElement("div")
    box.style.opacity         = '90%'
    box.style.backgroundColor = color
    box.style.position        = 'relative'
    box.style.borderCollapse  = 'collapse'
    box.style.border          = '0.5px solid black'
    box.style.width           = width + "%"
    box.style.height          = height + "%"
    box.classList.add("coloredBox")
    return box
}
const generateBoard = (form, 
                              board, 
                              numberOfElementsInField, 
                              numberOfElementsInRow, 
                              numberOfElementsInColumn, 
                              level) => 
{

    for(let i = 0; i < numberOfElementsInField; ++i)
    {
        board.appendChild(generateBox(100/numberOfElementsInRow,100/numberOfElementsInColumn))
    }
    let puzzles = []
    document.querySelectorAll('.box').forEach((box) => {
        let innerBox = generateInnerBox()
        box.appendChild(innerBox)
        for(let i = 0; i < level._size * level._size; ++i)
        {
            innerBox.appendChild(generateColoredBox(calculateWidth(level._size),
                                                    calculateHeight(level._size), 
                                                    getRandomColor(level._Colors)))
        }
        puzzles.push(innerBox)
    })
    let box = document.querySelector('.innerBox')
    document.querySelectorAll('.innerBox').forEach((innerBox) => {
        let randomRad = Math.floor(Math.random() * 4) * Math.PI/2
        innerBox.style.rotate = randomRad + 'rad'
        let rotateRad = randomRad
        innerBox.addEventListener('click', (e) => {
            rotateRad += Math.PI/2
            innerBox.style.rotate  = rotateRad + 'rad' 
        })
    })
    let stats = generateStats(form, 
                              board,
                              box, 
                              getUser()._points, 
                              level._points, 
                              level._attempts,
                              level._timer, 
                              getRandomPuzzle(puzzles))
    form.appendChild(stats)
    // add timer to stats
}



const generateRightItem = (randomItem, box) => {
    randomItem.id          = 'rightItem'
    let rightItem          = randomItem.cloneNode(true)
    rightItem.style.width  = box.offsetWidth + 'px'
    rightItem.style.height = box.offsetHeight + 'px'
    rightItem.style.rotate = Math.floor((Math.random() * 4)) * Math.PI/2 + 'rad'
    randomItem.classList.remove('.innerBox')
    window.addEventListener('resize', () => {
        rightItem.style.width  = box.offsetWidth + 'px'
        rightItem.style.height = box.offsetHeight + 'px'
    })
    return rightItem
}

const generateStats = (form, board, box, points, point, attempts, time, randomItem) => 
{
    let stats                  = document.createElement('div')
    stats.style.position       = 'relative'
    stats.style.display        = 'flex'
    stats.style.flexWrap       = 'wrap'
    stats.style.justifyContent = 'center'
    stats.style.alignItems     = 'center'
    stats.style.left           = board.offsetWidth + 'px'
    stats.style.width          = form.offsetWidth - board.offsetWidth + 'px'
    stats.style.height         = '100%'
    stats.style.top            = '-100%'
    stats.appendChild(generatebuttonSection())
    stats.appendChild(generateTimerLabel(time))
    stats.appendChild(generatePointsLabel(points))
    stats.appendChild(generateAttemptsLabel(attempts))
    stats.appendChild(generateRightItem(randomItem, box))
    stats.appendChild(generateChecker(points, point, attempts, box))
    window.addEventListener('resize', () => {
        stats.style.top        = '-100%'
        stats.style.left       = board.offsetWidth + 'px'
        stats.style.left       = board.offsetWidth + 'px'
        stats.style.width      = form.offsetWidth - board.offsetWidth + 'px'
    })
    return stats
}

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


const generatebuttonSection = () => {
    let buttonSection                  = document.createElement('div')
    let buttonUpdate                   = generateButton('Обновить')
    let buttonExit                     = generateButton('Результаты')
    let buttonChangeDiff               = generateButton('Сложность')
    buttonSection.addEventListener('click', (e) => {
        switch (e.target.textContent) {
            case 'Обновить':
                update()
                break;
            case 'Результаты':
                gameOver()
                break;
            case 'Сложность':
                changeDifficulty()
                break;
            default:
                break;
        }
    })
    buttonSection.style.width          = '60%'
    buttonSection.style.height         = 'auto'
    buttonSection.style.position       = 'relative'
    buttonSection.style.display        = 'flex'
    buttonSection.style.flexWrap       = 'wrap'
    buttonSection.style.justifyContent = 'center'
    buttonSection.style.alignItems     = 'center'
    buttonSection.appendChild(buttonExit)
    buttonSection.appendChild(buttonChangeDiff)
    buttonSection.appendChild(buttonUpdate)
    return buttonSection
}

var dragItem = null

const generateInnerBox = () => {
    let innerBox                  = document.createElement("div")
    innerBox.style.position       = 'relative'
    innerBox.style.display        = 'flex'
    innerBox.style.flexWrap       = 'wrap'
    innerBox.style.justifyContent = 'center'
    innerBox.style.alignItems     = 'center'
    innerBox.style.width          = '80%'
    innerBox.style.height         = '80%'
    innerBox.style.transition     = 'all 0.3s'
    innerBox.draggable            = true
    innerBox.classList.add("innerBox")
    innerBox.addEventListener('dragstart', (e) => {
        console.log('drag started');
        dragItem = e.target;
    });
    return innerBox
}




const generateChecker = (points, point, attempts, box) => {
    let checker                  = document.createElement("div")
    checker.style.width          = box.offsetWidth + "px"
    checker.style.height         = box.offsetHeight + 'px'
    checker.style.border         = '0.1rem solid black'
    checker.style.justifyContent = 'center'
    checker.style.transition     = 'all 0.3s ease'
    checker.style.alignItems     = 'center'
    checker.addEventListener('dragover', (e) => {
        e.preventDefault()
    });
    checker.addEventListener('drop', (e) => {
        e.preventDefault()
        if(dragItem != null) {
            let checkItem = dragItem.cloneNode()
            checker.appendChild(checkItem)
            checker.innerHTML = ''
                if(checkItem.id == 'rightItem')
                {
                    points += parseInt(point)
                    checker.style.backgroundColor = 'green'
                    setTimeout(() => {
                        checker.style.backgroundColor = '#092fed'
                        update()
                    }, 500)
                }
                else
                {
                    --attempts;
                    if(attempts == 0)
                    {
                        gameOver()
                    }
                    checker.style.backgroundColor = 'red'
                    setTimeout(() => {
                        checker.style.backgroundColor = '#092fed'
                    }, 500)
    
                }
                updateStats(points, attempts)
            dragItem = null
            checkItem = null
        }
    })
    window.addEventListener('resize', () => {
        checker.style.width  = box.offsetWidth + 'px'
        checker.style.height = box.offsetHeight + 'px'
    })
    return checker
}



const updateStats = (points, attempts) => {
    let user = getUser()
    let pointsLabel           = document.querySelector('.points')
    let attemptsLabel         = document.querySelector('.attempts')
    pointsLabel.textContent   = 'Очки: ' + points
    attemptsLabel.textContent = 'Попытки: ' + attempts
    user._record < points ? user._record = points : null
    localStorage.setItem(user._login, JSON.stringify({'_login' : user._login, 
                                                '_points' : points, 
                                                '_record' : user._record}
                                                )
                        )
}



window.addEventListener('resize', () => { 
    board.style.width          = form.offsetHeight + "px" // changing width of board when window is resizing
});

const board                    = document.querySelector(".gameField")
const form                     = document.querySelector(".gameForm")
const level                    = JSON.parse(localStorage.getItem("choosedLevel"))
if(level === undefined)
    changeDifficulty()
 
const numberOfElementsInRow    = 3
const numberOfElementsInColumn = 3
const numberOfElementsInField  = numberOfElementsInColumn * numberOfElementsInRow
board.style.width              = form.offsetHeight + "px" // Set width of board equal to height of form && 
                                                          // height 100% of form
generateBoard(form, board, numberOfElementsInField, numberOfElementsInRow, numberOfElementsInColumn, level)


let start = Date.now() 
setInterval(() => {
    let delta = Math.floor((Date.now() - start) / 1000)
    console.log(delta)
    if(level._timer - delta >= 0)
        document.querySelector(".timer").textContent = "Таймер: " + (level._timer - delta)
    else{
        gameOver()
    }
    
}, level._timer)
    

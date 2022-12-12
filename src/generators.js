/* REFACTOR THIS SHIT PLIIIS

PLEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSSSSSSSSSSSEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/


// repair innerbox click handler(mb errors with rotateDegs)


const generatePointsLabel = (points) => {
    let pointsLabel            = document.createElement('div')
    pointsLabel.id             = 'points'
    pointsLabel.style.position = 'relative'
    pointsLabel.style.width    = '50%'
    pointsLabel.style.height   = 'auto'
    pointsLabel.style.fontSize = '2rem'
    pointsLabel.textContent    = 'Очки: ' + points
    pointsLabel.style.color    = 'white'
    return pointsLabel
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
    return attemptsLabel
}


var rightItem = ''
var stats     = ''
var checker   = ''
var points    = 0
var dragItem  = null


const getRandomColor  = (Colors) => {return Colors[Math.floor(Math.random() * Colors.length)]}
const calculateWidth  = (size)   => {return 100/size}
const calculateHeight = (size)   => {return 100/size}


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




const getPoints = () => {
    return localStorage.getItem('points') != null ? points = localStorage.getItem('points') : 0
}

export const generateBoard = (form, 
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
        let randomDeg = Math.floor(Math.random() * 4) * 90
        innerBox.style.rotate = randomDeg + 'deg'
        let rotateDeg = randomDeg
        innerBox.addEventListener('click', () => {
            if(rotateDeg == 0)
                rotateDeg = 90
            else if(rotateDeg == 270)
                rotateDeg = 0

            innerBox.style.rotate  = rotateDeg + 'deg' 
            rotateDeg += 90
        })
    })
    stats = generateStats(form, board, box, getPoints(), level._attempts, puzzles[Math.floor(Math.random() * puzzles.length)])
    form.appendChild(stats)
    // add timer to stats
}


const generateRightItem = (randomItem, box) => {
    let rightItem          = randomItem.cloneNode(true)
    rightItem.id           = 'rightItem'
    rightItem.style.width  = box.offsetWidth + 'px'
    rightItem.style.height = box.offsetHeight + 'px'
    rightItem.style.rotate = Math.floor((Math.random() * 4)) * Math.PI/2 + 'rad'
    rightItem.classList.remove('.innerBox')
    window.addEventListener('resize', () => {
        rightItem.style.width  = box.offsetWidth + 'px'
        rightItem.style.height = box.offsetHeight + 'px'
    })
    return rightItem
}

const generateStats = (form, board, box, points, attempts, randomItem) => 
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
    checker                    = 
    stats.appendChild(generatebuttonSection())
    stats.appendChild(generatePointsLabel(points))                                // points label
    stats.appendChild(generateAttemptsLabel(attempts))            // attempts label
    stats.appendChild(generateRightItem(randomItem, box))                                  // right item
    stats.appendChild(generateChecker(form, points, attempts, box))                                    // checker
    stats.style.top = '-100%'
    stats.style.left = board.offsetWidth + 'px'
    stats.style.width = form.offsetWidth - board.offsetWidth + 'px'
    window.addEventListener('resize', () => {
        stats.style.top = '-100%'
        stats.style.left = board.offsetWidth + 'px'
        stats.style.width = form.offsetWidth - board.offsetWidth + 'px'
    })
    return stats
}

const generateButton = (name) => {
    let button                   = document.createElement('button')
    button.style.position        = 'relative'
    button.style.borderRadius    = '10px'
    button.style.width           = '200px'
    button.style.height          = '50px'
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
        if(e.target.textContent == 'Обновить')
            window.location.reload()
        else if(e.target.textContent == 'Результаты')
            window.location.href = 'results.html'
        else if(e.target.textContent == 'Сложность')
            window.location.href = '/levelConfig.html'
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



const generateInnerBox = () => {
    let innerBox                  = document.createElement("div")
    innerBox.classList.add("innerBox")
    innerBox.style.position       = 'relative'
    innerBox.style.display        = 'flex'
    innerBox.style.flexWrap       = 'wrap'
    innerBox.style.justifyContent = 'center'
    innerBox.style.alignItems     = 'center'
    innerBox.style.width          = '80%'
    innerBox.style.height         = '80%'
    innerBox.style.transition     = 'all 0.3s'
    innerBox.draggable            = true
    innerBox.addEventListener('dragstart', (e) => {
        console.log('drag started');
        dragItem = this;
    });
    let rotateDeg                 = (innerBox.style.rotate).slice(0, 3)

    return innerBox
}



const check = (dragItem) => {
    console.log(dragItem)
    if(dragItem != 'null') {
        let checkItem = dragItem.cloneNode(true)
        checker.appendChild(checkItem)
        checker.innerHTML = ''
            if(checkItem.id == 'rightItem')
            {
                points += point
                checker.style.backgroundColor = 'green'
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
            else
            {
                --attempts;
                if(attempts == 0)
                {
                    window.location.href = 'results.html'
                }
                checker.style.backgroundColor = 'red'
                setTimeout(() => {
                    checker.style.backgroundColor = '#092fed'
                }, 500)

            }
            updateStats()
        dragItem = null
        checkItem = null
    }
    console.log(dragItem)
}


const generateChecker = (form, point, attempts, box) => {
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
    checker.addEventListener('drop', check())
    window.addEventListener('resize', () => {
        checker.style.width = box.offsetWidth + 'px'
        checker.style.height = box.offsetHeight + 'px'
    })
    return checker
}



const updateStats = () => {
    let pointsLabel = document.querySelector('.points')
    let attemptsLabel = document.querySelector('.attempts')
    pointsLabel.textContent = 'Очки: ' + points
    attemptsLabel.textContent = 'Попытки: ' + attempts
}




window.addEventListener('resize', () => {
    stats.style.top = '-100%'
    stats.style.left = board.offsetWidth + 'px'
    stats.style.width = form.offsetWidth - board.offsetWidth + 'px'
    pointsLabel.style.width = '50%'
    attemptsLabel.style.width = '50%'
    rightItem.style.width = box.offsetWidth + 'px'
    rightItem.style.height = box.offsetHeight + 'px'

})
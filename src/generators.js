/* REFACTOR THIS SHIT PLIIIS

PLEEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSSSSSSSSSSSEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/




var rightItem = ''
var checker = ''
var points = 0
var pointsLabel = generatePointsLabel()
var attempts = 0
var attemptsLabel = generateAttemptsLabel()
var dragItem = null
var stats = ''

function getRandomColor(Colors) {return Colors[Math.floor(Math.random() * Colors.length)]}
function calculateWidth(size)   {return 100/size}
function calculateHeight(size)  {return 100/size}

function generatePointsLabel() {
    let pointsLabel = document.createElement('div')
    pointsLabel.id = 'points'
    pointsLabel.style.position = 'relative'
    pointsLabel.style.width = '50%'
    pointsLabel.style.height = 'auto'
    pointsLabel.style.fontSize = '2em'
    pointsLabel.textContent = 'Points: ' + points
    pointsLabel.style.color = 'white'
    return pointsLabel
}


function generateAttemptsLabel()
{
    let attemptsLabel = document.createElement('div')
    attemptsLabel.id = 'attempts'
    attemptsLabel.style.position = 'relative'
    attemptsLabel.style.width = '50%'
    attemptsLabel.style.height = 'auto'
    attemptsLabel.style.fontSize = '2em'
    attemptsLabel.textContent = 'Attempts: ' + attempts
    attemptsLabel.style.color = 'white'
    return attemptsLabel
}

function dragStart() {
    console.log('drag started');
    dragItem = this;
    setTimeout(() => this.className = 'invisible', 0)
}

function dragEnd() {
    console.log('drag ended');
  	this.className = 'item'
}

function dragDrop() {
    console.log('drag dropped');
    console.log(this)
}

function dragOver(e) {
    e.preventDefault()
    console.log('drag over');
}


function generateBox (width, height) {
    let box                  = document.createElement("div")
    box.classList.add("box")
    box.style.opacity        = '90%'
    box.style.display        = 'flex'
    box.style.flexWrap       = 'wrap'
    box.style.justifyContent = 'center'
    box.style.alignItems     = 'center'
    box.style.position       = 'relative'
    box.style.borderCollapse = 'collapse'
    box.style.width          = width + "%"
    box.style.height         = height + "%"
    return box
}


function generateColoredBox (width, height, color) {
    let box                   = document.createElement("div")
    box.classList.add("coloredBox")
    box.style.opacity         = '90%'
    box.style.backgroundColor = color
    box.style.position        = 'relative'
    box.style.borderCollapse  = 'collapse'
    box.style.border          = '0.5px solid grey'
    box.style.width           = width + "%"
    box.style.height          = height + "%"
    return box
}




export function generateBoard(form, board, numberOfElementsInField, numberOfElementsInRow, numberOfElementsInColumn, level) // export function generateField (size, Colors) need to be changed
{
    attempts = localStorage.getItem('attempts')
    points = localStorage.getItem('points')
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
            innerBox.appendChild(generateColoredBox(calculateWidth(level._size),calculateHeight(level._size), getRandomColor(level._Colors)))
        }
        puzzles.push(innerBox)
    })
    let box = document.querySelector('.innerBox')
    let randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)]
    randomPuzzle.id = 'rightItem' 
    rightItem = randomPuzzle.cloneNode(true) // clone random puzzle
    rightItem.classList.remove('innerBox')
    rightItem.style.width          = box.offsetWidth + "px"
    rightItem.style.height         = box.offsetWidth + 'px'
    rightItem.style.transform      = Math.floor(Math.random() * 4) * 90
    stats = generateStats(form, board, box, level._points, level._attempts)
    document.querySelectorAll('.innerBox').forEach((innerBox) => {
        innerBox.style.transform = Math.floor(Math.random() * 4) * 90
    })
    // form.appendChild(updateButton)
    // form.appendChild(timer)
    // form.appendChild(exit)
    // form.appendChild(changeDiff)
    form.appendChild(stats)
    // add attempts to stats
    // add timer to stats
    // add buttonUpdate to stats
    // add buttonExit to stats
    // add buttonChangeDiff to stats
    // realize rotate 
}


function generateStats(form, board, box, point, attempt)
{
    let stats                  = document.createElement('div')
    stats.classList.add('stats')
    stats.style.position       = 'relative'
    stats.style.left           = '0'
    stats.style.display        = 'flex'
    stats.style.flexWrap       = 'wrap'
    stats.style.justifyContent = 'center'
    stats.style.top = '-100%'
    stats.style.left = board.offsetWidth + 'px'
    stats.style.width = form.offsetWidth - board.offsetWidth + 'px'
    stats.style.alignItems     = 'center'
    stats.style.height         = '100%'
    stats.style.border         = '1px solid black'
    checker = generateChecker(form, point, attempts)
    // buttonSection = generateButtonSection()
    pointsLabel = generatePointsLabel()
    attemptsLabel = generateAttemptsLabel()
    stats.appendChild(generatebuttonSection())
    stats.appendChild(pointsLabel)
    stats.appendChild(attemptsLabel)
    stats.appendChild(rightItem)
    stats.appendChild(checker)
    window.addEventListener('resize', () => {
        stats.style.top = '-100%'
        stats.style.left = board.offsetWidth + 'px'
        stats.style.width = form.offsetWidth - board.offsetWidth + 'px'
        pointsLabel.style.width = '50%'
        attemptsLabel.style.width = '50%'
        rightItem.style.width = box.offsetWidth + 'px'
        rightItem.style.height = box.offsetHeight + 'px'
        checker.style.width = box.offsetWidth + 'px'
        checker.style.height = box.offsetHeight + 'px'
    })
    return stats
}

function generateButton(name)
{
    let button                   = document.createElement('button')
    button.style.position        = 'relative'
    button.style.borderRadius    = '10px'
    button.style.width           = '200px'
    button.style.height          = '50px'
    button.style.fontSize        = '2em'
    button.style.margin          = '10px'
    button.style.transition      = '0.2s'
    button.style.backgroundColor = 'white'
    button.textContent           = name
    button.addEventListener('mouseenter', () => {
        button.style.cursor = 'pointer'
        button.style.transform   = 'scale(1.2)'
    })
    button.addEventListener('mouseleave', () => {
        button.style.transform   = 'scale(1)'
    })
    return button
}


function generatebuttonSection()
{
    let buttonSection                  = document.createElement('div')
    let buttonUpdate                   = document.createElement('button')
    let buttonExit                     = document.createElement('button')
    let buttonChangeDiff               = document.createElement('button')
    buttonSection.style.width          = '60%'
    buttonSection.style.height         = 'auto'
    buttonSection.style.position       = 'relative'
    buttonSection.style.display        = 'flex'
    buttonSection.style.flexWrap       = 'wrap'
    buttonSection.style.justifyContent = 'center'
    buttonSection.style.alignItems     = 'center'
    buttonSection.appendChild(generateButton('Сложность'))
    buttonSection.appendChild(generateButton('Обновить'))
    buttonSection.appendChild(generateButton('Закончить'))
    return buttonSection
}



function generateInnerBox()
{
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
    innerBox.draggable            = true // make innerBox draggable
    let rotateDeg                 = 0
    innerBox.addEventListener('dragover', dragOver);
    innerBox.addEventListener('dragstart', dragStart);
    innerBox.addEventListener('dragend', dragDrop);
    innerBox.addEventListener('click', () => {
        rotateDeg                 =  rotateDeg + 90
        innerBox.style.transform  = 'rotate(' + rotateDeg + 'deg)'
    })

    return innerBox
}


function generateChecker(form, point, attempts) 
{
    let box                      = document.querySelector('.innerBox')
    let checker                  = document.createElement("div")
    checker.style.position       = 'relative'
    checker.style.width          = box.offsetWidth + "px"
    checker.style.height         = box.offsetHeight + 'px'
    window.addEventListener('resize', () => {
        checker.style.width     = box.offsetWidth + "px"
        checker.style.height    = box.offsetHeight + 'px'
    })
    checker.style.top            = '-' + checker.offsetHeight + 'px'
    checker.style.border         = '0.5px solid grey'
    checker.draggable            = true
    checker.style.display        = 'flex'
    checker.style.justifyContent = 'center'
    checker.style.transition     = 'all 0s ease'
    checker.style.alignItems     = 'center'    
    checker.addEventListener('dragover', (e) => {
        e.preventDefault()
    });
    checker.addEventListener('mouseenter', () => {
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
                    checker.style.backgroundColor = 'red'
                    setTimeout(() => {
                        checker.style.backgroundColor = '#092fed'
                    }, 500)

                }
                // updateStats()
            dragItem = null
            checkItem = null
        }
        console.log(dragItem)
    })
    return checker
}



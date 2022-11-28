var rightItem = ''
function getRandomColor(Colors) {return Colors[Math.floor(Math.random() * Colors.length)]}
function calculateWidth(size)   {return 100/size}
function calculateHeight(size)  {return 100/size}

let dragItem = null;

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
    puzzles[Math.floor(Math.random() * puzzles.length)].id = 'rightItem' // set id to random puzzle
    let stats = generateStats()
    form.appentChile(rightItem)
    form.appendChild(updateButton)
    form.appendChild(timer)
    form.appendChild(exit)
    form.appendChild(changeDiff)
    form.appendChild(stats)
    stats.appendChild(generateChecker(form))
    // add right item to stats
    // add attempts to stats
    // add timer to stats
    // add buttonUpdate to stats
    // add buttonExit to stats
    // add buttonChangeDiff to stats
    // realize rotate 
    // finish checker functionality
}


function generateStats()
{
    let stats                  = document.createElement('div')
    stats.classList.add('stats')
    stats.style.position       = 'relative'
    stats.style.display        = 'flex'
    stats.style.flexWrap       = 'wrap'
    stats.style.justifyContent = 'center'
    stats.style.top            = '-100%'
    stats.style.left           = '60%'
    stats.style.alignItems     = 'center'
    stats.style.width          = '40%'
    stats.style.height         = '100%'
    stats.style.border         = '1px solid black'
    return stats
}


function generateInnerBox()
{
    let innerBox                  = document.createElement("div")
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


function generateChecker(form)
{
    let box                      = document.querySelector('.box')
    let checker                  = document.createElement("div")
    checker.style.position       = 'relative'
    checker.style.width          = box.offsetWidth + "px"
    checker.style.height         = box.offsetHeight + 'px'
    checker.style.top            = '100%' 
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
        let checkItem = dragItem.cloneNode(true)
        checker.appendChild(checkItem)
        if(checkItem.id == 'rightItem')
        {
            checker.style.backgroundColor = 'green'
            window.location.reload()
        }
        else
        {
            checker.style.backgroundColor = 'red'
            checker.style.transition = 'all 0.3s ease'
            checker.innerHTML = ''
        }
    })
    return checker
}



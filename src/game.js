import {generateBox} from './generators.js'



const level = JSON.parse(localStorage.getItem("choosedLevel"))
const elementsInFieldsRow = 3
const elementsInFieldsColumn = 2
const elementsInField     = 6

function generateBoard(size,Colors)
{
    const board = document.querySelector(".gameField")
    const squares = generateSquares(elementsInField,level._size)
    for(let i = 0; i < elementsInField; ++i)
    {
        board.appendChild(generateBox())
    }
}


function generateSquares(elements,size)
{
    let squares = []
    let width = 90 / elementsInFieldsRow / size
    let height = 90 / elementsInFieldsColumn / size
    for(let i = 0; i < elements; ++i)
    {
        squares.push(generateSquare(height, width, level._Colors, level._size))
    }
    return squares
}
generateBoard(level._size, level._Colors)


function generateSquare(height, width, Colors, size)
{
    let square = document.createElement("div")
    square.style.width = width + "%"
    square.style.height = height + "%"
    square.classList.add("square")
    square.style.backgroundColor = level._Colors[Math.floor(Math.random() * level._Colors.length)]
    return square
}
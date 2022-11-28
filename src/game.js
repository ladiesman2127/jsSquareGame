import {generateBoard} from './generators.js'

window.addEventListener('resize', function(event) { 
    board.style.width          = form.offsetHeight + "px" // changing width of board when window is resizing
}, true);

const board                    = document.querySelector(".gameField")
const form                     = document.querySelector(".gameForm")
const level                    = JSON.parse(localStorage.getItem("choosedLevel"))
const numberOfElementsInRow    = 3
const numberOfElementsInColumn = 3
const numberOfElementsInField  = numberOfElementsInColumn * numberOfElementsInRow
board.style.width              = form.offsetHeight + "px" // Set width of board equal to height of form && 
                                                          // height 100% of form





generateBoard(form, board, numberOfElementsInField, numberOfElementsInRow, numberOfElementsInColumn, level)


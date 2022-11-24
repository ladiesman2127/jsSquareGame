export function generateBox () {
    let box = document.createElement("div")
    let sizeX = 100/3;
    let sizeY = 80/2;
    box.style.backgroundColor = 'white'
    box.style.position = 'relative'
    box.style.display = 'inline-block'
    box.style.gap = '5px'
    box.style.borderCollapse = 'collapse'
    box.style.border = '2px solid black'
    box.style.width = sizeX + "%"
    box.style.height = sizeY + "%"
    return box
}
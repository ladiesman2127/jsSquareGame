
class level {
    constructor(size, attempts, Colors, points, timer) {
        this._size = size
        this._attempts = attempts
        this._Colors = Colors
        this._points = points
        this._timer = timer
    }
}


function generateColors(countOfColors)
{
    let colors = []
    for(let i = 0; i < countOfColors; ++i)
    {
        let red   = Math.floor(Math.random() * 256)
        let blue  = Math.floor(Math.random() * 256)
        let green = Math.floor(Math.random() * 256)
        colors.push("#" + (1 << 24 | red << 16 | green << 8 | blue).toString(16).slice(1))
    }
    return colors
}


const levels = new Map([
    ['easy',  new level(3, 1, generateColors(5), 10,5)],
    ['medium',new level(4, 1, generateColors(7), 20,8)],
    ['hard',  new level(5, 2, generateColors(10), 30,10)],
    ['unreal',new level(6, 3, generateColors(15), 50,15)],
]) 









var levelNames = document.querySelectorAll(".level_name")
levelNames.forEach((levelName) => {
    levelName.addEventListener("click", () => {
        var choosedLevel = levels.get(levelName.id)
        localStorage.setItem("choosedLevel", JSON.stringify(choosedLevel))
        window.location.href = "./game.html"
    })
})




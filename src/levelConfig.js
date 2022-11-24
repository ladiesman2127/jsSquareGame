


class level {
    constructor(size, attempts, Colors) {
        this._size = size
        this._attempts = attempts
        this._Colors = Colors
    }
    get size() {
        return this._size
    }
    get attempts() {
        return this._attempts
    }
    get Colors() {
        return this._Colors
    }



}


const levels = new Map([
    ['easy',  new level(3, 1, generateColors(3))],
    ['medium',new level(4, 2, generateColors(5))],
    ['hard',  new level(5, 2, generateColors(7))],
    ['unreal',new level(6, 3, generateColors(10))],
]) 



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





var levelNames = document.querySelectorAll(".level_name")
levelNames.forEach((levelName) => {
    levelName.addEventListener("click", () => {
        var choosedLevel = levels.get(levelName.id)
        localStorage.setItem("choosedLevel", JSON.stringify(choosedLevel))
        window.location.href = "/game.html"
    })
})




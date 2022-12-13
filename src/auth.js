class User {
    constructor(login, points, record) {
        this._login = login
        this._points = points
        this._record = record
    }
}

const addNewUser = (userName) => {
    localStorage.setItem(userName, JSON.stringify(new User(userName, 0, 0)))
    let users = []
    localStorage.getItem('users') != null ? users = JSON.parse(localStorage.getItem('users')) : users = []
    users.push(userName)
    localStorage.setItem('users', JSON.stringify(users))
} 

const updateStorage = (userName) => {
    if(localStorage.getItem(userName) == null)
        addNewUser(userName)
    localStorage.setItem("currentUser", userName)
}

document.querySelector(".signin").addEventListener("click", () => {
    const userName = document.querySelector(".login").value
    if(userName === "") return
    updateStorage(userName)
    window.location.href = "/levelConfig.html"
})


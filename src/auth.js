



document.querySelector(".signin").addEventListener("click", () => {
    const login   = document.querySelector(".login").value;
    if(localStorage.getItem(login) == null)
        localStorage.setItem("login", login)
    window.location.href = "/levelConfig.html"
})


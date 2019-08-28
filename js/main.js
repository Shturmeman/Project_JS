const main = document.getElementsByTagName("main")[0]



main.findById = function (id) {
    return document.getElementById(id)
}

main.openLogPageButton = main.findById("login-page")
main.regbutton = main.findById("openRegPage")
main.logOutButton = main.findById("logOut")
main.userAccountButton = main.findById("account")
main.openHomePageButton = main.findById("homepage")
main.projButton = main.findById("examples")
main.projBox = main.findById("project_box")
main.navmenu = main.findById("menu")

main.findById("trigger").onclick = function () {
    open()
};

function open() {
    main.findById("menu").classList.toggle("show");
}


main.getCookie = function () {
    function getCookies() {
        var res = document.cookie.split("; ").map(
            x => {
                var tmp = x.split("=")
                var elem = {}
                elem[tmp[0]] = tmp[1]
                return elem
            })
        return Object.assign({}, ...res)
    }
    main.cookieObj = getCookies()
    if (main.cookieObj.userId && main.cookieObj.hash) {
        async function getUser() {
            let response = await fetch(`https://fea13-valera.glitch.me/users/${main.cookieObj.userId}`)
            let user = await response.json()
            if (`hash=${main.cookieObj.hash}` === user.userPassword) {
                main.currentUser = {
                    name: user.name,
                    id: user.id,
                    photo: user.avatar,
                    email: user.email,
                    phone: user.phone,
                    hash: user.userPassword
                }
                if (user.role) {
                    if (user.role === "admin") {
                        let admlog = new Event("admin-logged")
                        main.dispatchEvent(admlog)
                        main.currentUser.role = "admin"
                    }
                }
                console.log("curUser", main.currentUser)
                main.userAccountButton.style.display = "inline"
                main.openLogPageButton.style.display = "none"
                main.regbutton.style.display = "none"
                main.logOutButton.style.display = "inline"
            }
        }
        getUser()
    }
    else {
        main.userAccountButton.style.display = "none"
        main.logOutButton.style.display = "none"
        main.regbutton.style.display = "inline"
        main.openLogPageButton.style.display = "inline"
    }
}
main.getCookie()



main.openLogPageButton.onclick = function (event) {
    const loginPage = document.createElement("login-page")
    loginPage.setAttribute("markup", "../chank/login.html")
    document.body.style.overflow = "hidden"
    this.appendChild(loginPage)
}.bind(main)

main.logOutButton.onclick = function (event) {
    this.appendChild(document.createElement("yes-no"))
    document.body.style.overflow = "hidden"
}.bind(main)

main.regbutton.onclick = function (event) {
    this.regpage = document.createElement("register-page")
    this.regpage.setAttribute("markup", "chank/registration.html")

    this.appendChild(this.regpage)
}.bind(main)

main.addEventListener("new-user", finishedReg)
function finishedReg(event) {
    console.log(event.userData)
    main.currentUser = {
        name: event.userData.name,
        id: event.userData.id,
        photo: event.userData.photo
    }
}

main.firstProjects = async function () {

    let projects = await (await fetch("https://fea13-valera.glitch.me/projects")).json()
    let proj = projects.slice(0, 3)
    proj.forEach(elem => {
        let card = document.createElement("proj-card")
        card.setAttribute("header", elem.projectName)
        card.setAttribute("text", elem.text)
        card.setAttribute("img", elem.img)
        main.projBox.appendChild(card)
    })
}
main.firstProjects()

main.projButton.onclick = async function () {
    let projects = await (await fetch("https://fea13-valera.glitch.me/projects")).json()
    let currentProjects = main.projBox.getElementsByTagName("proj-card")
    let nextProjects = projects.slice(currentProjects.length, currentProjects.length + 3)
    console.log(projects)
    console.log(nextProjects)

    nextProjects.forEach(elem => {
        let card = document.createElement("proj-card")
        card.setAttribute("header", elem.projectName)
        card.setAttribute("text", elem.text)
        card.setAttribute("img", elem.img)
        main.projBox.appendChild(card)
    })
    

}

main.addEventListener("admin-logged", event => {
    main.lin = document.createElement("li")
    main.lin.appendChild(document.createElement("a")).innerHTML = "Admin room"
    main.navmenu.appendChild(main.lin)
    main.lin.onclick = function (event) {
        main.innerHTML = ""
        main.appendChild(document.createElement("admin-page"))
    }
})
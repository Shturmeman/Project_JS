class LoginPage extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "closed" })
        this.css = document.createElement("style")
        this.shadow.appendChild(this.css)
    }
    connectedCallback() {
    }
    static get observedAttributes() {
        return ["markup"]
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        let html = this.shadow
        let getValues = this.getData.bind(this)
        async function setAttrs(newVal, html, getValues) {
            let resp = await Promise.all([
                fetch(newVal)
                    .then(response => response.text()),
                fetch(`chank/registration.css`)
                    .then(response => response.text())
            ])
            html.innerHTML = await resp[0];
            html.appendChild(document.createElement("style")).textContent = await resp[1];
            await getValues()
        }
        setAttrs(newVal, html, getValues)
    }
    getData() {
        this.userEmail = this.shadow.querySelector("#input-email")
        this.userPassword = this.shadow.querySelector("#input-password")
        this.button = this.shadow.querySelector("#logButton")
        this.errorSpace = this.shadow.querySelector("#error")
        this.button.disabled = true
        this.button.style.background = "red"

        this.userPassword.onchange = function (event) {
            document.cookie = `hash=${Sha256.hash(event.target.value)}`
            event.target.valid = event.target.value.length >= 8
            if (this.userPassword.valid && this.userEmail.valid) {
                this.button.disabled = false
                this.button.style.background = "green"
            }
        }.bind(this)


        this.userEmail.onchange = function (event) {
            event.target.valid = event.target.value.length >= 5 && event.target.value.indexOf("@") > 0
            if (this.userPassword.valid && this.userEmail.valid) {
                this.button.disabled = false
                this.button.style.background = "green"
            }
        }.bind(this)

        this.shadow.querySelector("#closeWindow").onclick = function(event){
            this.remove()
            document.body.style.overflow = "auto"
        }.bind(this)    

        this.button.onclick = function (event) {
            let email = this.userEmail.value
            let pass = Sha256.hash(this.userPassword.value)
            let err = this.errorSpace
            let window = this
            async function checker(email, pass) {
                let response = await fetch("https://fea13-valera.glitch.me/users")
                let arrayOfObj = await response.json()
                let currentUser = arrayOfObj.find(function (user) {
                    return user.email === email
                })
                if (currentUser) {
                    if (currentUser.userPassword === `hash=${pass}`) {
                        document.cookie = `userId=${currentUser.id}`
                        err.innerHTML = ""
                        main.regbutton.style.display = "none"
                        main.openLogPageButton.style.display = "none"
                        main.logOutButton.style.display = "inline"
                        main.userAccountButton.style.display = "inline"
                        main.openHomePageButton.style.display = "inline"
                        if (currentUser.role) {
                            if (currentUser.role === "admin") {
                                let admlog = new Event("admin-logged")
                                main.dispatchEvent(admlog)
                            }
                        }
                        let event = new Event("new-user")
                        event.userData = currentUser
                        main.dispatchEvent(event)
                        window.remove()
                        document.body.style.overflow = "auto"
                    }
                    else {
                        err.innerHTML = "Wrong password"
                    }
                }
                else {
                    err.innerHTML = "Wrong email"
                }
            }
            checker(email, pass)
        }.bind(this)
    }
}
customElements.define("login-page", LoginPage)






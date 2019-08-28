class UserAccount extends HTMLElemnt {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"closed"})
        this.shadow.innerHTML = `
            <section>
            <h3></h3>
            <img></img>
            </section>
        `
        let style = document.createElement("style")
        style.textContent = ``
        this.shadow.appendChild(style)
    }
}
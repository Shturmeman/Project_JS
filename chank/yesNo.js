class YesNo extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        let wrapper = document.createElement('div')
        wrapper.className = "wrapper"
        wrapper.innerHTML = `
        
        <div class="form">
        <div class="exit" id="closeWindow"></div>
            <h2>Do you really want to log out?</h2>
            <div class="buttons">
                <button id="yesBut">YES</button>
                <button id="noBut">NO</button></div>
            
        </div>
        `

        let style = document.createElement('style')
        style.textContent = `
            
.form{
    width: 400px;
    height: 200px;
    margin: auto;
    position: fixed;
   background: #e9e9e9;
   top: 15%;
   left: 0;
   right: 0;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
border: 5px solid #5b2b2b;
border-radius: 150px;
color: rgb(83, 89, 94);
}

.buttons>button{
    border-radius: 5px;
    font-size: 20px;
    background: #5b2b2b;
    border: 0;
    color: whitesmoke;
    padding: 15px 25px;
    outline:none;
    transition: all 0.8s ease;
    margin: 15px;
    cursor: pointer;

}
.buttons>button:hover{
    cursor: pointer;
    background: #088f03;
    transform: scale(1.2)
}
.exit{
    cursor: pointer;
    
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
    background: url(img/close.png) no-repeat center;
    background-size: 100%;
    
}
.exit:hover{
    cursor: pointer;
}
        `
        this.shadow.appendChild(style)
        this.shadow.appendChild(wrapper)
        this.shadow.querySelector("#yesBut").onclick = function (event) {
            main.regbutton.style.display = "inline"
            main.openLogPageButton.style.display = "inline"
            main.logOutButton.style.display = "none"
            main.userAccountButton.style.display = "none"
            main.openHomePageButton.style.display = "none"
            this.remove()
            main.currentUser = null
            document.cookie = `userId= ; hash= `
            document.body.style.overflow = "auto"
        }.bind(this)
        this.shadow.querySelector("#closeWindow").onclick = function (event) {
            this.remove()
            document.body.style.overflow = "auto"
        }.bind(this)
        this.shadow.querySelector("#noBut").onclick = function (event) {
            this.remove()
            document.body.style.overflow = "auto"
        }.bind(this)
    }
}


customElements.define("yes-no", YesNo)






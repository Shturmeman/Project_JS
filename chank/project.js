class ProjectCard extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "closed" })
        this.shadow.innerHTML = `
                <div class="project_box">
                <h3 id="proj_title"></h3>
                <img id="proj_content">
                <p id="proj_description"></p>  
                </div>
        `
        let css = document.createElement("style")
        css.textContent = `
            .project_box{
                min-width : 33%;
                background : grey;
                flex-direction : column;
                display:flex;
                position:relative;
            }
            img{
                max-width: 100%;
                min-height:500px;
                position:relative;
            }
            h3{
                position:absolute;
                content:"";
                top: 30%;
                left:50%;
                transform:translate(-50%);
                color:white;
                background : #00000085;
                font-size:25px;
                z-index:1;
                text-align:center;
            }
            p{
                position:absolute;
                content:"";
                top: 50%;
                left:50%;
                transform:translate(-50%);
                color:red;
                font-size:18px;
                z-index:1;
                text-align:center;
            }
        `
        this.shadow.appendChild(css)
    }
    connectedCallback() {

    }
    static get observedAttributes() {
        return ["img", "text", "header"]
    }
    attributeChangedCallback(attrName, oldVal, newVal) {

        this.getData(attrName, newVal)
    }
    getData = function (attrName, newVal) {
        this.img = this.shadow.querySelector("#proj_content")
        this.text = this.shadow.querySelector("#proj_description")
        this.projName = this.shadow.querySelector("#proj_title")
        if (attrName === "header"){
            this.projName.innerHTML = newVal
        }

        if (attrName === "img") {
            this.img.src = newVal
        }
        if (attrName === "text") {
            this.text.innerHTML = newVal
        }

    }
}

customElements.define("proj-card", ProjectCard)
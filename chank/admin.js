class AdminPage extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "closed" })
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="chank/admin.css">
        <section>
        <h3 >GENERAL INFO</h3>

                
                    <div class="siteinfo">
                        <div class="infoabout" id="infoabout">
                            <h2 id="usersCounter"></h2>
                            <h2 id="comments"></h2>
                            <div class="buttons"> 
                            <button class="menubut" id="productsbut"> PRODUCTS</button>
                            </div>
                        </div>
                    </div>
                    <h3 id="general">CURRENT ORDERS</h3>
                    <div class="orders" id="orders"></div>
                    <div class="products" id="products">
                        <div class="products insert" id="newproducts">
                    
                        </div>
                    </div>
                    <div class="users" id="users"></div>
                    <div class="users" id="commentswin"></div>

                </section>
        `
    }
    connectedCallback() {
        this.getData()
    }

    getData = function () {
        let counter = this.shadow.querySelector("#usersCounter")

        let usersWin = this.shadow.querySelector("#users")
        let productsWin = this.shadow.querySelector("#products")
        let ordersWin = this.shadow.querySelector('#orders')
        let commentsWin = this.shadow.querySelector('#commentswin')

        let header = this.shadow.querySelector("#general")


        let productsbut = this.shadow.querySelector("#productsbut")
        let newProduct = this.shadow.querySelector("#newproducts")

        
        productsbut.onclick = function (event) {
            header.innerHTML = "PRODUCTS"
            usersWin.style.display = "none"
            ordersWin.style.display = "none"
            productsWin.style.display = "flex"
            commentsWin.style.display = "none"

        }.bind(this)

        async function getItems() {

            let products = await (await fetch("https://fea13-valera.glitch.me/projects")).json()

            let addItem = document.createElement("button")
            addItem.className = "addButton"
            addItem.innerHTML = "ADD NEW"
            productsWin.appendChild(addItem)
            addItem.onclick = function (event) {
                newProduct.style.display = "flex"
                addItem.style.display = "none"
                let cart = document.createElement("div")
                cart.className = "cart"
                let info = document.createElement("div")
                info.className = "info"

                let saveBut = document.createElement("button")
                saveBut.className = "done"
                saveBut.innerHTML = "SAVE"
                info.appendChild(saveBut)

                cart.appendChild(info)
                let ord = document.createElement("div")
                ord.className = "order"
                let orderinfo = document.createElement("div")
                orderinfo.className = "orderinfo"
                let nameinfo = document.createElement("span")
                orderinfo.appendChild(nameinfo)
                    .innerHTML = "NAME"
                let projinfo = document.createElement("span")
                orderinfo.appendChild(projinfo)
                    .innerHTML = "TEXT"
               
                let changePic = document.createElement("input")
                changePic.type = "file"
                changePic.id = `inputNew`
                changePic.style.display = "none"
                let changeLabel = document.createElement("label")
                changeLabel.className = "changeLabel"
                changeLabel.innerHTML = "Photo"
                changeLabel.htmlFor = `inputNew`
                orderinfo.appendChild(changePic)
                orderinfo.appendChild(changeLabel)

                nameinfo.contentEditable = true
                nameinfo.style.border = "1px solid green"
                projinfo.contentEditable = true
                projinfo.style.border = "1px solid green"
                ord.appendChild(orderinfo)
                let img = document.createElement("img")
                ord.appendChild(img)

                changePic.onchange = function (event) {
                    let photo = event.target.files[0]
                    if (photo.type.indexOf("image") === 0 && photo.size <= 500000) {
                        let reader = new FileReader
                        reader.readAsDataURL(photo)
                        reader.onload = function (ev) {
                            photo = ev.target.result
                            img.src = photo
                        }.bind(this)
                    }
                }.bind(this)

                saveBut.onclick = function (ev) {
                    addItem.style.display = "inline"
                    newProduct.style.display = "none"
                    fetch("https://fea13-valera.glitch.me/projects", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            projectName: nameinfo.innerHTML,
                            text: projinfo.innerHTML,
                            img: img.src,
                        })
                    }).then(
                        response => response.json()).then(res => {
                            debugger
                            usersWin.innerHTML = ""
                            productsWin.innerHTML = ""
                            ordersWin.innerHTML = ""
                            getItems()
                            newProduct = productsWin.appendChild(
                                document.createElement("div")
                            )
                            newProduct.className = "products insert"
                            newProduct.id = "newproducts"
                        })
                }.bind(this)
                cart.appendChild(ord)
                newProduct.appendChild(cart)
            }.bind(this)





            if (products.length > 0) {
                products.forEach(prod => {
                    let cart = document.createElement("div")
                    cart.className = "cart"
                    let info = document.createElement("div")
                    info.className = "info"
                    let nummer = document.createElement("span")
                    nummer.className = "nummer"
                    nummer.innerHTML = prod.id
                    info.appendChild(nummer)

                    let deleteBut = document.createElement("button")
                    deleteBut.className = "done"
                    deleteBut.innerHTML = "DELETE"
                    info.appendChild(deleteBut)

                    let editBut = document.createElement("button")
                    editBut.className = "done"
                    editBut.innerHTML = "EDIT"
                    info.appendChild(editBut)

                    cart.appendChild(info)

                    let ord = document.createElement("div")
                    ord.className = "order"

                    let orderinfo = document.createElement("div")
                    orderinfo.className = "orderinfo"

                    let nameinfo = document.createElement("span")
                    orderinfo.appendChild(nameinfo)
                        .innerHTML = prod.projectName
                    let projinfo = document.createElement("span")
                    orderinfo.appendChild(projinfo)
                        .innerHTML = prod.text

                    let changePic = document.createElement("input")
                        changePic.type = "file"
                        changePic.id = `label${prod.id}`
                        changePic.style.display = "none"

                    let changeLabel = document.createElement("label")
                        changeLabel.className = "changeLabel"
                        changeLabel.innerHTML = "Photo"
                        changeLabel.htmlFor = `label${prod.id}`
                        changeLabel.style.display = "none"

                    orderinfo.appendChild(changePic)
                    orderinfo.appendChild(changeLabel)

                    ord.appendChild(orderinfo)

                    let img = document.createElement("img")
                    img.src = prod.img
                    ord.appendChild(img)
                    cart.appendChild(ord)
                    productsWin.appendChild(cart)

                    changePic.onchange = function (event) {
                        let photo = event.target.files[0]
                        if (photo.type.indexOf("image") === 0 && photo.size <= 1500000) {
                            let reader = new FileReader
                            reader.readAsDataURL(photo)
                            reader.onload = function (ev) {
                                photo = ev.target.result
                                img.src = photo
                            }.bind(this)
                        }
                    }.bind(this)

                    deleteBut.onclick = function (event) {
                        fetch(`https://fea13-valera.glitch.me/projects/${prod.id}`, {
                            method: "DELETE",
                        }).then(
                            response => response.json())
                            .then(response => {
                                cart.remove()
                            })
                    }.bind(this)

                    editBut.onclick = function editItem(event) {
                        projinfo.contentEditable = true
                        projinfo.style.border = "1px solid green"
                        nameinfo.contentEditable = true
                        nameinfo.style.border = "1px solid green"
                        changeLabel.style.display = "inline"

                        editBut.onclick = function (event) {
                            changeLabel.style.display = "none"
                            projinfo.contentEditable = false
                            projinfo.style.border = "0"
                            nameinfo.contentEditable = false
                            nameinfo.style.border = "0"
                            fetch(`https://fea13-valera.glitch.me/projects/${prod.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    projectName: nameinfo.innerHTML,
                                    text: projinfo.innerHTML,
                                    img: img.src,
                                })
                            }).then(response => response.json())
                                .then(response => {
                                    nameinfo.innerHTML = response.projectName
                                    projinfo.innerHTML = response.text
                                    img.src = response.img
                                })
                            editBut.onclick = editItem
                        }
                    }.bind(this)
                });
            }
            else if (products.length === 0) {
                productsWin.appendChild(
                    document.createElement("h3")
                ).innerHTML = "There aren't any products in the database now"
            }
        }
        getItems()
    }
}
customElements.define("admin-page", AdminPage)

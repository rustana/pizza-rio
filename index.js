import {menuArray} from "./data.js";// helloconst item = document.getElementById('item')const cart = document.getElementById('cart')const modal = document.getElementById('modal')let cartArray = []item.addEventListener("click", (e) => {    clickedId(e.target.dataset.id)})const clickedId = (id) => {    let newItem = menuArray.filter(el => (el.id == id))[0]    cartArray.push(newItem)    calculateItems()    return cartArray}const calculateItems = () => {    let counts = []    counts = cartArray.reduce((c, {name: key}) => (c[key] = (c[key] || 0) + 1, c), {});    let result = Object.keys(counts).map(e => ({        name: e, count: counts[e]    }))    for (let i = 0; i < result.length; i++) {        for (let k = 0; k < cartArray.length; k++) {            if (result[i].name === cartArray[k].name) {                result[i].price = cartArray[k].price                result[i].id = cartArray[k].id            }        }    }    let cartContainer = '<h2 id="total">Your Order:</h2>'    result.map(el =>        cartContainer += `            <div id="items-cart" data-name="${el.name}">                <h2>${el.name}</h2>                <p id="remove" data-id="${el.id}"">remove</p>                <h3>$ ${el.count * el.price}</h3>            </div>`)    let total = 0    result.map(el => total += el.count * el.price)    cartContainer +=        `<div id="order-total">                    <h2 >Total Price: </h2>                <h2>$${total}</h2>        </div>        <p id="complete-btn" >Complete Order</p>`    renderCart(cartContainer)    const complete = document.getElementById('complete-btn')    modalCall(complete)}const modalCall = (complete) => {    complete.addEventListener('click', function () {        modal.style.display = 'inline'    })    modal.addEventListener('submit', (e) => {        e.preventDefault()        const form = new FormData(modal)        const name = form.get('name')        console.log(name)        modal.style.display = 'none'        cart.innerHTML=`            <div id="thanks">            Thanks ${name}!             <p>Your order is on its way!</p>            </div>`    })}function renderSection() {    let itemSection = ''    menuArray.map(el =>        itemSection += `            <div class="menuItem" >                <p class="icon">                    ${el.emoji}                </p>                <div class="itemDescription">                    <h2>${el.name}</h2>                    <h4>${el.ingredients.map(el => el).join(', ')}</h4>                    <h3 id="price">$${el.price}</h3>                </div>                <p id="add-btn" data-id="${el.id}">+</p>            </div>            <p id="line"></p>`    )    render(itemSection)}const renderCart = (cartContainer) => {    cart.innerHTML = cartContainer}const render = (itemSection) => {    item.innerHTML = (itemSection)}renderSection(menuArray)
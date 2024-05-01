let label = document.getElementById(`label`)
let ShoppinCart = document.getElementById(`shopping-cart`)

let basket = JSON.parse(localStorage.getItem(`data`)) || []

let calculation = () => {
  let CartIcon = document.getElementById(`cartAmount`)
  CartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
  console.log()
}
calculation()
let generateCardItems = () => {
  if (basket.length !== 0) {
    return (ShoppinCart.innerHTML = basket
      .map((x) => {
        console.log(x)
        let { id, item } = x
        let search = shopItemsData.find((y) => y.id === id) || []
        return `
    <div class="card-item">
    <img width="100" src=${search.img} alt=""/>
    <div class="details">
    <div class="title-price-x">
    <h4 class="title-price">
    <P> ${search.name}</p>
    <p class="card-item-price"> ${search.price} &#x20B9</p>
    </h4>
    <i onClick="removeItem(${id})" class="bi bi-x-lg"></i>
    </div>
      <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity" >${item}</div>
            <i onclick="increment(${id} )" class="bi bi-plus-lg"></i>
          </div>
    <h3>
    ${item * search.price} &#8377
    </h3>

    </div>
    </div>
    `
      })
      .join(""))
  } else {
    ShoppinCart.innerHTML = ``
    label.innerHTML = `
    <h2>Card is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home
      </button>
    </a>`
  }
}
generateCardItems()
let increment = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1
  }
  generateCardItems()
  update(selectedItem.id)
  localStorage.setItem("data", JSON.stringify(basket))
  // console.log(basket)
}
let decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)
  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }
  update(selectedItem.id)
  basket = basket.filter((x) => x.item != 0)
  generateCardItems()
  localStorage.setItem("data", JSON.stringify(basket))
}
let update = (id) => {
  let search = basket.find((x) => x.id === id)
  //console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
  TotalAmount()
}
let removeItem = (id) => {
  let selectedItem = id
  // console.log(selectedItem)
  basket = basket.filter((x) => x.id !== selectedItem.id)
  generateCardItems()
  TotalAmount()
  localStorage.setItem("data", JSON.stringify(basket))
}
let clearCart = () => {
  basket = []
  generateCardItems()
  localStorage.setItem("data", JSON.stringify(basket))
}

let TotalAmount = () => {
  if (basket.length != 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x
        let search = shopItemsData.find((y) => y.id === id) || []
        return item * search.price
      })
      .reduce((x, y) => x + y, 0)
    label.innerHTML = `<h2>Total Bill: ${amount} &#8377</h2>
    <button class="checkout">Checkout      </button>
    <button onClick="clearCart()" class="removeAll">Clear Cart</button>`
  } else return
}
TotalAmount()

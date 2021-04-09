// Shopping cart
let user = {
  name: 'Mile',
  active: true,
  cart: [],
  purchases: [],
}

//Implement a cart feature:
const compose = function (f, g) {
  return function () {
    return f.call(this, g.apply(this, arguments))
  }
}
const purchaseItem = (...fns) => fns.reduce(compose)
// 1. Add items to cart.
const addItem = (user, item) =>
  Object.assign({}, user, { cart: user.cart.concat(item) })
// 2. Add 10% tax to items in cart
const applyTax = (user) => {
  const { cart } = user
  const cartTax = cart.map((elem) => {
    return { ...elem, price: elem.price * 1.1 }
  })

  return Object.assign({}, user, { cart: cartTax })
}
// 3. Buy item: cart --> purchases
const buyCart = (user) => Object.assign({}, user, { purchases: user.cart })
// 4. Empty cart
const emptyCart = (user) => {
  return Object.assign({}, user, { cart: [] })
}
//--------------
user = purchaseItem(
  emptyCart,
  buyCart,
  applyTax,
  addItem
)(user, { name: 'ball', price: 5 })

console.log(user)

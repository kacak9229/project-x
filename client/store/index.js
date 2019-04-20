export const state = () => ({
  cart: []
})

export const mutations = {
  addToCart(state, value) {
    state.cart.push({
      order: value
    })
  },
  setCart(state, value) {
    state.cart = value
  },
  remove(state, { order }) {
    state.list.splice(state.cart.indexOf(order), 1)
  }
}

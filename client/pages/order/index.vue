<template>
  <div class="container">
    <br>

    <h3 class="text-center">Your Cart</h3>
    <hr>

    <div class="card">
      <table class="table table-hover shopping-cart-wrap">
        <thead class="text-muted">
          <tr>
            <th scope="col">Foods</th>

            <th scope="col" width="120">Price</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.length > 0">
            <tr v-for="food in cart" :key="food">
              <td>
                <figure class="media">
                  <div class="img-wrap">
                    <img
                      :src="food.order.featured_image"
                      class="img-thumbnail img-sm"
                      style="width: 150px;"
                    >
                  </div>
                  <figcaption class="media-body">
                    <h6 class="title text-truncate">{{ food.order.name }}</h6>
                  </figcaption>
                </figure>
              </td>
              <td>
                <div class="price-wrap">
                  <var class="price">RM {{ food.order.price }}</var>
                  <small class="text-muted">(RM {{ food.order.price }} each)</small>
                </div>
                <!-- price-wrap .// -->
              </td>
            </tr>
            <tr>
              <td class="text-right">
                <h3>Total: RM {{totalPrice}}</h3>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <nuxt-link class="btn btn-primary" to="/payment">Confirm your order</nuxt-link>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data: function() {
    return {
      cart: this.$store.state.cart,
      total: 0
    }
  },
  methods: {},
  computed: {
    totalPrice() {
      let cart = this.$store.state.cart
      cart.forEach(food => {
        this.total = this.total + food.order.price
      })
      cart['totalPrice'] = this.total
      console.log(cart)
      return this.total
    }
  }
}
</script>


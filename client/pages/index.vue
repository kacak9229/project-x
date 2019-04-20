<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Eat delicious foods in KLCC area</h1>
        <p class="lead text-muted">Order the best foods and stay at home</p>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div
            v-if="addToCartTrue"
            class="alert alert-primary"
            role="alert"
          >{{ addToCartText}} Added to cart</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="shop in response" :key="shop.restaurant.R.res_id">
          <b-card
            v-if="shop.restaurant.featured_image"
            :title="shop.restaurant.name"
            :img-src="shop.restaurant.featured_image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <h3 style="color: red">
              <b-card-text>
                <b>RM {{ shop.restaurant.price }}</b>
              </b-card-text>
            </h3>
            <b-card-text>{{ shop.restaurant.location.address}}</b-card-text>

            <b-button @click="addToCart(shop.restaurant)" variant="outline-primary">Add to Cart</b-button>
          </b-card>
        </div>
        <br>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  async asyncData({ $axios }) {
    const lat = '3.1556056'
    const lon = '101.712604'
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-key': '4f7f2e946bb7b28687680e1516428406'
      }
    }
    let response = await $axios.$get(
      `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`,
      config
    )
    response.nearby_restaurants.forEach(shop => {
      shop['restaurant']['price'] = Math.floor(Math.random() * 100)
    })
    return {
      response: response.nearby_restaurants,
      addToCartTrue: false,
      addToCartText: ''
    }
  },
  methods: {
    addToCart(order) {
      this.$store.commit('addToCart', order)
      this.addToCartTrue = true
      this.addToCartText = order.name
    }
  }
}
</script>


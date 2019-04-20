<template>
  <main role="main">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">All Orders</h1>
        <p class="lead text-muted">Order the best foods and stay at home</p>
      </div>
    </section>
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="order in data" :key="order._id">
          <b-card :title="order._id" tag="article" style="max-width: 20rem;" class="mb-2">
            <span v-if="order.status === 'confirmed'" class="badge badge-primary">{{ order.status }}</span>
            <span v-if="order.status === 'delivered'" class="badge badge-success">{{ order.status }}</span>
            <span v-if="order.status === 'declined'" class="badge badge-danger">{{ order.status }}</span>
            <hr>
            <nuxt-link :to="{name: 'order-status-id', params: { id:order._id } }">Order Detail</nuxt-link>
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
    let response = await $axios.$get('http://localhost:3001/api/v1/order/all')
    return {
      data: response.orders
    }
  }
}
</script>


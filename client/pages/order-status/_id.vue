<template>
  <div class="container">
    <h1 class="text-center">Order Status</h1>

    <div class="progress">
      <div
        :class="progressBar"
        role="progressbar"
        :style="widthStatus"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      >{{ status }}</div>
    </div>

    <hr>
    <div class="row">
      <div class="col-md-9">
        <h4 v-if="status === 'confirmed'">
          Your order will be delivered in
          <span class="badge badge-info">{{ countDown }}</span>
        </h4>

        <h4 v-if="status === 'delivered'">Order has been delivered</h4>
        <h4 v-if="status === 'declined'">You cancelled the Order</h4>
      </div>
      <div class="col-md-3" v-if="status !== 'declined' && status !== 'delivered'">
        <button @click="cancelOrder(order._id)" class="btn btn-danger">Cancel your order</button>
      </div>
    </div>

    <hr>

    <div class="card" style="margin-top: 5%;">
      <table class="table table-hover shopping-cart-wrap">
        <thead class="text-muted">
          <tr>
            <th scope="col">Foods</th>
            <th scope="col" width="120">Price</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="order.foods.length > 0">
            <tr v-for="food in order.foods" :key="food">
              <td>
                <figure class="media">
                  <div class="img-wrap">
                    <img :src="food.image" class="img-thumbnail img-sm" style="width: 150px;">
                  </div>
                  <figcaption class="media-body">
                    <h6 class="title text-truncate">{{ food.name }}</h6>
                  </figcaption>
                </figure>
              </td>
              <td>
                <div class="price-wrap">
                  <var class="price">RM {{ food.price }}</var>
                  <small class="text-muted">(RM {{ food.price }} each)</small>
                </div>
                <!-- price-wrap .// -->
              </td>
            </tr>
            <tr>
              <td class="text-right">
                <h3>Total: RM {{ totalPrice }}</h3>
                <h3>Status: Paid</h3>
              </td>
            </tr>
            <tr></tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- card.// -->
  </div>
</template>


<script>
export default {
  created() {
    this.countDownTimer()
  },
  async asyncData({ $axios, params }) {
    let countDown = 0
    let status = 0
    let progressBar
    let statusBar
    try {
      let response = await $axios.$get(
        `http://0.0.0.0:3001/api/v1/order/${params.id}`
      )

      if (response.order.status === 'confirmed') {
        status = 50
        countDown = 10
      } else if (response.order.status === 'declined') {
        status = 100
        progressBar = 'bg-danger'
      } else if (response.order.status === 'created') {
        status = 25
      } else if (response.order.status === 'delivered') {
        status = 100
      }

      return {
        order: response.order || [],
        widthStatus: `width: ${status}%`,
        progressBar: `progress-bar ${progressBar}`,
        status: response.order.status,
        countDown: countDown,
        total: 0
      }
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    async cancelOrder(id) {
      let progressBar
      let status
      let response = await this.$axios.$post(
        `http://0.0.0.0:3001/api/v1/order/cancel/${id}`
      )

      if (response.order.status === 'confirmed') {
        status = 50
      } else if (response.order.status === 'declined') {
        status = 100
        progressBar = 'bg-danger'
      } else if (response.order.status === 'created') {
        status = 25
      } else if (response.order.status === 'delivered') {
        status = 100
        progressBar = 'progress-bar-success'
      }

      this.widthStatus = `width: ${status}%`
      this.progressBar = `progress-bar ${progressBar}`
      this.status = response.order.status
    },
    async countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }

      if (this.countDown === 0 && this.status === 'confirmed') {
        let response = await this.$axios.$post(
          `http://0.0.0.0:3001/api/v1/order/change-status/${
            this.$route.params.id
          }`
        )
        let status = 100
        let progressBar = 'progress-bar-success'
        this.widthStatus = `width: ${status}%`
        this.progressBar = `progress-bar ${progressBar}`
        this.status = response.order.status
      }
    }
  },
  computed: {
    totalPrice() {
      console.log(this.order.foods)
      let order = this.order.foods
      order.forEach(food => {
        this.total = this.total + food.price
      })
      return this.total
    }
  }
}
</script>


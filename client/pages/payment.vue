<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6" style="margin-top: 10%">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Payment Details</h3>
            <p class="lead">(Just click the button to test the microservice API)</p>
          </div>
          <div class="panel-body" style="margin-top: 5%">
            <form role="form">
              <div class="form-group">
                <label for="cardNumber">CARD NUMBER</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="cardNumber"
                    placeholder="Valid Card Number"
                    required
                    autofocus
                  >
                  <span class="input-group-addon">
                    <span class="glyphicon glyphicon-lock"></span>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-7 col-md-7">
                  <div class="form-group">
                    <label for="expityMonth">EXPIRY DATE</label>
                    <div class="col-xs-6 col-lg-6 pl-ziro">
                      <input
                        type="text"
                        class="form-control"
                        id="expityMonth"
                        placeholder="MM"
                        required
                      >
                    </div>
                    <div class="col-xs-6 col-lg-6 pl-ziro">
                      <input
                        type="text"
                        class="form-control"
                        id="expityYear"
                        placeholder="YY"
                        required
                      >
                    </div>
                  </div>
                </div>
                <div class="col-xs-5 col-md-5 pull-right">
                  <div class="form-group">
                    <label for="cvCode">CV CODE</label>
                    <input
                      type="password"
                      class="form-control"
                      id="cvCode"
                      placeholder="CV"
                      required
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br>
        <template v-if="this.$store.state.cart.length > 0">
          <button
            class="btn btn-success btn-lg btn-block"
            role="button"
            @click="pay"
          >Pay RM {{ this.$store.state.cart.totalPrice }}</button>
        </template>
        <template v-else>
          <a
            href="http://www.jquery2dotnet.com"
            class="btn btn-success btn-lg btn-block"
            role="button"
          >Pay 0</a>
        </template>
      </div>

      <div class="col-md-6" style="margin-top: 10%">
        <img style="width: 120%">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async pay() {
      console.log(this.$store.state.cart)
      let response = await this.$axios.$post(
        'http://localhost:3001/api/v1/order',
        {
          order: this.$store.state.cart
        }
      )

      if (response.success) {
        this.$store.commit('setCart', [])
        this.$router.push('/order-status')
      }
    }
  }
}
</script>


<style>
.panel-title {
  display: inline;
  font-weight: bold;
}
.checkbox.pull-right {
  margin: 0;
}
.pl-ziro {
  padding-left: 0px;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <nuxt-link to="/">
      <img src="~/assets/images/foodtigerlogo.png" style="width: 150px">
    </nuxt-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <nuxt-link class="nav-link" to="/order">
            <span
              v-if="this.$store.state.cart.length > 0"
              class="badge badge-danger"
            >{{ this.$store.state.cart.length}}</span>Cart
          </nuxt-link>
        </li>

        <li class="nav-item">
          <nuxt-link class="nav-link" to="/order-status">Check Order status</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

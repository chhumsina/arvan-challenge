<template>
  <div class="h-100 w-100 position-absolute">
    <b-container>
      <b-row class="justify-content-center v-center">
        <b-col lg="6" md="8">
          <b-card class="border-0 text-center pb-3">
            <h1 class="py-4 m-0">
              WELCOME TO NUXT APP
            </h1>
            <b-link
              :to="{name: 'login'}"
            >
              LOGIN
            </b-link>
            <span
              class="px-4"
            >
              |
            </span>
            <b-link
              :to="{name: 'register'}"
            >
              REGISTER
            </b-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
  @import "../assets/scss/dep";

  .card {
    background-color: #ECEEEF;
  }
</style>

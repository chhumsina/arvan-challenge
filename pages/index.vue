<template>
  <div class="h-100 w-100 position-absolute">
    <b-container>
      <b-row class="justify-content-center v-center">
        <b-col lg="6" md="8">
          <b-card class="border-0 text-center pb-3">
            <v-button @click="hi()">
              Open
            </v-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {
      methods: {
        hi() {
          this.$axios.$get('http://google.com/').then(function (response) {
    // handle success
    setTimeout(function () { window.location = 'https://itunes.apple.com/al/app/aba-mobile-bank/id968860649?mt=8'; }, 25);
    window.location = 'abamobilebank://ababank.com?type=payway&qrcode=1111111';
  })
  .catch(function (error) {
    console.log('error', error);
    // handle error
    setTimeout(function () { window.location = 'https://itunes.apple.com/al/app/aba-mobile-bank/id968860649?mt=8'; }, 25);
    window.location = 'abamobilebank://ababank.com?type=payway&qrcode=2222222';
  });
        }
      }
    };
</script>

<style scoped lang="scss">
  @import "../assets/scss/dep";

  .card {
    background-color: #ECEEEF;
  }
</style>

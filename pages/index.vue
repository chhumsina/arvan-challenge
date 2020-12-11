<template>
  <div class="h-100 w-100 position-absolute">
    <b-container>
      <b-row class="justify-content-center v-center">
        <b-col lg="6" md="8">
          <b-card class="border-0 text-center pb-3">
            <button @click="hi()">
              Open
            </button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {
    async asyncData({ params, $axios }) {
      const post = await $axios.$get('https://api.nuxtjs.dev/posts/1');
      return { post };
    },
    mounted() {
      window.location = 'http://payway-staging.ababank.com/aba_deeplink.html';
    },

      methods: {
        hi() {
          this.$axios.$get('http://google.com/').then(function (response) {
    // handle success
    setTimeout(function () { window.location = 'https://itunes.apple.com/al/app/aba-mobile-bank/id968860649?mt=8'; }, 25);
    window.location = 'http://payway-staging.ababank.com/aba_deeplink.html';
  })
  .catch(function (error) {
    console.log('error: http://payway-staging.ababank.com/aba_deeplink.html', error);
    // handle error
    setTimeout(function () { window.location = 'https://itunes.apple.com/al/app/aba-mobile-bank/id968860649?mt=8'; }, 25);
    window.location = 'http://payway-staging.ababank.com/aba_deeplink.html';
  });
        }
      },
      head() {
    return {
      title: 'Sina title',
      meta: [
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: 'https://wonderful-wilson-dd6749.netlify.app/'
        },
        {
          property: 'og:image',
          content: this.post.image
        },
        {
          name: 'og:title',
          content: this.post.title
        },
        {
          name: 'og:description',
          content: this.post.description
        }
      ]
    };
  }
    };
</script>

<style scoped lang="scss">
  @import "../assets/scss/dep";

  .card {
    background-color: #ECEEEF;
  }
</style>

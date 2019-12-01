import Vue from 'vue';

Vue.mixin({
  methods: {
    scrollTop: (amount = 0) => {
      if (!process.browser) {
        return;
      }

      window.scroll({
        top: amount,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
});

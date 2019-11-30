<template>
  <notifications
    group="axios"
    position="center top"
    :speed="1000"
    :duration="5000"
  >
    <template
      slot="body"
      slot-scope="props"
    >
      <div
        class="vue-notification"
        :class="props.item.type"
        @click="props.close"
      >
        <h2
          v-if="props.item.title"
          class="notification-title text-right mb-2"
        >
          {{ props.item.title }}
        </h2>
        <p
          v-if="props.item.text"
          class="m-0 text-right"
        >
          {{ props.item.text }}
        </p>
      </div>
    </template>
  </notifications>
</template>

<script>
    export default {};
</script>

<style lang="scss">
  @import "../../assets/scss/dep";

  .vue-notification-group {
    display: block;
    position: fixed;
    z-index: 5000;

    @media (max-width: map-get($grid-breakpoints, "md")) {
      left: 2px !important;
      right: 2px !important;
      width: calc(100% - 4px) !important;
    }
  }

  .vue-notification {
    padding: 10px;
    color: #ffffff;

    font-size: 13px;
    margin: 5px 2.5px;
    background: $primary;
    border-right: 5px solid $primary;
    border-left: none !important;

    display: block;
    text-align: right;

    &,
    &.vue-notification-template {
      text-align: right !important;
    }

    &.warn {
      background: $warning;
      border-color: darken($warning, 5%);
    }

    &.danger {
      background: #b71b66;
      border-color: darken(#b71b66, 10%);
    }

    &.success {
      background: $success;
      border-color: darken($success, 5%);
    }
  }

  .vue-notification-wrapper {
    display: block;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .notification-title {
    font-weight: 600;
  }

  .vue-notification-template {
    display: block;
    box-sizing: border-box;
    background: white;
    text-align: right;
  }

  .vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move {
    transition: all .5s;
  }

  .vn-fade-enter, .vn-fade-leave-to {
    opacity: 0;
  }
</style>

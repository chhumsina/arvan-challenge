export const actions = {
  login({ commit }, { body, headers = { headers: { sendAuth: false } } } = {}) {
    return this.$axios.$post('/login/', body, headers);
  }
};

export default function ({ $axios, store, redirect }) {
  $axios.setHeader('Accept', 'application/json');

  $axios.onRequest((config) => {
    if (config.headers && config.headers.sendAuth !== false) {
      config.headers.Authorization = `Bearer ${store.$auth.getToken('local')}`;
    }

    if (config.headers && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    delete config.headers.sendAuth;
  });

  $axios.onError((error) => {
    if (error && error.response && error.response.status) {
      if (error.response.status === 500) {
        redirect({ name: 'error-id', params: { id: error.response.status } });
      } else if (error.response.status === 401 && store.$auth.$state.loggedIn) {
        redirect({ name: 'error-id', params: { id: error.response.status } });
      }
    }
  });
}

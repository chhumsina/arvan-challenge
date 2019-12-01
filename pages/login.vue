<template>
  <div class="h-100 w-100 position-absolute">
    <b-container>
      <div class="d-flex justify-content-center v-center">
        <div class="login-container w-100">
          <b-card
            no-body
            class="border-0"
          >
            <div class="card-body px-4 pt-2 pb-1">
              <h1 class="py-4 m-0 text-uppercase text-muted text-center">
                Login
              </h1>
              <b-form
                @submit.prevent="submit"
              >
                <b-form-group
                  :class="$v.model.email.$invalid && ($v.model.email.$anyDirty || flags.errorOnSubmit) ? 'text-danger' : ''"
                  label="Email"
                >
                  <b-form-input
                    v-model.trim="model.email"
                    type="email"
                    placeholder=""
                    autocomplete="off"
                    class="border-0 mb-2"
                    :disabled="flags.loading"
                    :state="$v.model.email.$invalid && ($v.model.email.$anyDirty || flags.errorOnSubmit) ? false : null"
                    @input="$v.model.email.$touch"
                  />
                  <b-form-invalid-feedback>
                    Required Field!
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  :class="$v.model.password.$invalid && ($v.model.password.$anyDirty || flags.errorOnSubmit) ? 'text-danger' : ''"
                  label="Password"
                >
                  <b-form-input
                    v-model.trim="model.password"
                    type="password"
                    placeholder=""
                    autocomplete="off"
                    class="border-0 mb-2"
                    :disabled="flags.loading"
                    :state="$v.model.password.$invalid && ($v.model.password.$anyDirty || flags.errorOnSubmit) ? false : null"
                    @input="$v.model.password.$touch"
                  />
                  <b-form-invalid-feedback>
                    Required Field!
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-button
                  block
                  type="submit"
                  variant="primary"
                >
                  Login
                </b-button>

                <p class="mt-3">
                  Don't have account?

                  <b-link
                    class="text-dark px-2"
                    :to="{name: 'register'}"
                  >
                    <b>
                      Register Now
                    </b>
                  </b-link>
                </p>
              </b-form>
            </div>
          </b-card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
    import { email, required } from 'vuelidate/lib/validators';

    export default {
        data: () => ({
            model: {
                email: '',
                password: ''
            },
            flags: {
                loading: false,
                errorOnSubmit: false
            }
        }),
        methods: {
            async submit() {
                if (this.$v.$invalid) {
                    /**
                     * Scroll to top of page
                     */
                    this.scrollTop();

                    /**
                     * Show all errors
                     */
                    this.flags.showError = true;
                    this.flags.errorOnSubmit = true;

                    /**
                     * $notify notification to user
                     */
                    this.$notify({
                        clean: true,
                        group: 'axios'
                    });
                    this.$notify({
                        group: 'axios',
                        type: 'danger',
                        text: 'لطفا همه فیلدها را کامل نمایید!'
                    });

                    return;
                }

                const body = {
                    email: this.model.email,
                    password: this.model.password
                };
                await this.$store.dispatch('authentication/login', { body });
            }
        },
        validations: {
            model: {
                email: {
                    required,
                    email
                },
                password: {
                    required
                }
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "../assets/scss/dep";

  .login-container {
    max-width: 500px;

    .form-control {
      border: none;
    }

    .form-control.is-invalid {
      border: 1px solid $danger !important;
    }

    .card {
      background-color: #ECEEEF;
    }
  }
</style>

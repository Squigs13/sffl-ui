<template>
    <b-form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <b-form-input type="email" id="inputEmail" placeholder="Email address" required="" autofocus="" v-model="email"></b-form-input>
      <label for="inputPassword" class="sr-only">Password</label>
      <b-form-input type="password" id="inputPassword" placeholder="Password" required="" v-model="password"></b-form-input>
      <div class="checkbox mb-3">
          <b-form-checkbox value="remember-me">Remember me</b-form-checkbox>
      </div>
      <b-button size="lg" variant="primary" block type="submit">Sign in</b-button>
    </b-form>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      const { email, password } = this
      this.$store.dispatch('login', { email, password }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

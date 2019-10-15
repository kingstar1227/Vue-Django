<template>
  <div class="loginbox">
    <b-card>
      <LoginForm @submit="handleSubmit"></LoginForm>
      <div class="mt-3 text-center">
        <b-link :to="{ name: 'signup' }">Signup</b-link>
      </div>
    </b-card>
    <b-modal hide-header ok-only v-model="error">
      Invalid username or password
    </b-modal>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import { AuthService } from '@/services'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data() {
    return {
      error: false
    }
  },
  mounted() {
    if (localStorage.getItem('calorie-token')) {
      this.$router.push({
        name: 'record-list'
      })
    }
  },
  methods: {
    handleSubmit(loginData) {
      AuthService.login(loginData.username, loginData.password)
      .then(({ data }) => {
        localStorage.setItem('calorie-token', data.token)
        localStorage.setItem('calorie-username', loginData.username)
        this.$router.push({
          name: 'record-list'
        })
      })
      .catch(() => {
        this.error = true
      })
    },
  }
}
</script>

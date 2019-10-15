<template>
  <div class="signupbox">
    <b-card>
      <SignupForm @submit="handleSubmit"></SignupForm>
    </b-card>
    <b-modal hide-header ok-only v-model="error">
      Failed to signup.
    </b-modal>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'
import { AuthService } from '@/services'

export default {
  name: 'Signup',
  components: {
    SignupForm
  },
  data() {
    return {
      error: false,
    }
  },
  methods: {
    handleSubmit(data) {
      AuthService.signup(data)
      .then((response) => {
        this.$router.push({
          name: 'login'
        })
      })
      .catch(() => {
        this.error = true
      })
    },
  }
}
</script>
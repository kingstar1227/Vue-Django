<template>
  <b-form @submit.prevent="handleSubmit">
    <!-- Field -->
    <b-form-group
      label="Username:"
      :feedback="errors.first('username')"
      :state="errors.has('username') ? 'invalid' : 'valid'"
    >
      <b-form-input type="text" v-model="form.username" placeholder="Enter username"
        name="username" v-validate="'required'""
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Email:"
      :feedback="errors.first('email')"
      :state="errors.has('email') ? 'invalid' : 'valid'"
    >
      <b-form-input type="text" v-model="form.email" placeholder="Enter email"
        name="email" v-validate="'required|email'""
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Password:"
      :feedback="errors.first('password')"
      :state="errors.has('password') ? 'invalid' : 'valid'"
    >
      <b-form-input type="password" v-model="form.password" placeholder="Enter password"
        name="password" v-validate="'required|min:6'"
      ></b-form-input>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Password Confirmation:"
      :feedback="errors.first('password_confirm')"
      :state="errors.has('password_confirm') ? 'invalid' : 'valid'"
    >
      <b-form-input type="password" v-model="form.password_confirm" placeholder="Confirm your password"
        name="password_confirm" v-validate="'required|confirmed:password'"
      ></b-form-input>
    </b-form-group>
    <!-- Submit button -->
    <div class="mt-4">
      <b-button type="submit" variant="primary" block>
        Signup
      </b-button>
    </div>
  </b-form>
</template>

<script>
import FormBase from '@/mixins/FormBase'

export default {
  name: 'SignupForm',
  mixins: [
    FormBase,
  ],
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirm: ''
      }
    }
  },
}
</script>
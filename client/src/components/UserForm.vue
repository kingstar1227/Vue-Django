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
      label="User Role:"
      :feedback="errors.first('user_role')"
      :state="errors.has('user_role') ? 'invalid' : 'valid'"
    >
      <b-form-select v-model="form.user_role" :options="roles"
        name="user_role" v-validate="'required|numeric'""
      ></b-form-select>
    </b-form-group>
    <!-- Field -->
    <b-form-group
      label="Password:"
      :feedback="errors.first('password')"
      :state="errors.has('password') ? 'invalid' : 'valid'"
      v-if="!initialData"
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
      v-if="!initialData"
    >
      <b-form-input type="password" v-model="form.password_confirm" placeholder="Confirm your password"
        name="password_confirm" v-validate="'required|confirmed:password'"
      ></b-form-input>
    </b-form-group>
    <!-- Submit button -->
    <div class="mt-4 text-center">
      <b-button type="submit" variant="primary">{{ submitButtonLabel }}</b-button>
      <b-button variant="secondary" :to="{ name: 'user-list' }">Back</b-button>
    </div>
  </b-form>
</template>

<script>
import FormBase from '@/mixins/FormBase'

export default {
  name: 'UserForm',
  mixins: [
    FormBase,
  ],
  props: {
    'userRole': {
      type: Number,
      required: true,
    },
  },
  data() {
    const allRoles = [
      { value: 0, text: 'Normal User' },
      { value: 1, text: 'User Manager' },
      { value: 2, text: 'Admin' },
    ]
    const data = {
      form: {
        username: '',
        email: '',
        user_role: 0,
      },
      roles: allRoles //.filter(elm => parseInt(elm.value) <= parseInt(this.userRole)),
    }
    if (!this.initialData) {
      data.form.password = ''
      data.form.password_confirm = ''
    }
    return this.getInitialData(data)
  },
  computed: {
    submitButtonLabel() {
      return this.initialData ? 'Update' : 'Create'
    },
  },
}
</script>
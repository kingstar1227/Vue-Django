<template>
  <div>
    Logging out...
  </div>
</template>

<script>
export default {
  name: 'Logout',
  beforeMount() {
    localStorage.removeItem('calorie-token')
    localStorage.removeItem('calorie-username')
    this.$router.push({
      name: 'login'
    })
  }
}
</script>
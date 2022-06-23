<template>
  <v-app dark>
    <nuxt/>
  </v-app>
</template>

<script>
import { getItem } from '~/helpers/persistanceStorage'

export default {
  created(){
    const user = getItem('user')
    console.log(user)
    if(user){
      this.$store.dispatch('auth/logIn', user)
    }
  },
  name: 'DefaultLayout',
  data () {
    return {
    }
  },
}
</script>

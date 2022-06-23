<template>
  <v-app dark>
    <nuxt v-if="show"/>
  </v-app>
</template>

<script>
import { getItem } from '~/helpers/persistanceStorage'

export default {
  created(){
    const user = getItem('user')
    if(user){
      this.$store.dispatch('auth/logIn', user).then(()=>this.show=true).catch(()=>this.show=true)
    }else{
      this.show=true
    }
  },
  name: 'DefaultLayout',
  data () {
    return {
      show: false
    }
  },
}
</script>

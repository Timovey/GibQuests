<template>
    <div>
      <Header title='Авторизация'/>
      <v-main class="pa-2 d-flex h-80 align-center mt-4">
        <LoginForm :error="error" @submit="submit"/>
      </v-main>
    </div>
</template>


<script>
import { setItem, getItem } from '~/helpers/persistanceStorage'
import Header from '~/components/UI/Header'
import Quest from '~/components/Quest'
import LoginForm from '~/components/auth/loginForm'
import { mapState } from 'vuex'
export default {
  components:{
    Header,
    Quest,
    LoginForm
  },
  data(){
    return{
      error: false
    }
  },
  methods: {
    submit(user){
      this.$store.dispatch('auth/logIn', user)
        .then(user=>{
          this.error = false
          this.$router.push('/')
        })
        .catch(err=>this.error=err)
    }
  },
  computed:{
    ...mapState('quests', ['quests'])
  }
}
</script>

<style>
  .h-80{
    height: 80vh !important;
  }
</style>

<template>
    <div>
      <Header title='Все квесты'/>
      <v-main class="pa-2 mt-4">
        <v-text-field solo label="Найти квест"></v-text-field>
        <Quest class="mb-4" v-for="item in quests" :item="item" :key="item.id"/>
      </v-main>
    </div>
</template>


<script>
import Header from '~/components/UI/Header'
import Quest from '~/components/Quest.vue'
import { mapState } from 'vuex'
export default {
  components:{
    Header,
    Quest
  },
  data(){
    return{
      search: '',
      quests: []
    }
  },
  created(){
    this.$axios.get('/getQuests').then((res)=>{
      this.quests = res.data.data
    })
  }
}
</script>

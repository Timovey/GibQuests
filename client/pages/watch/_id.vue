<template>
    <div v-if="quest">
        <Header title='Отслеживание'/>
        <v-row class="my-3 d-flex justify-space-between text-center align-center">
            <v-col no-gutters class="col col-2">
                <v-icon @click="$router.go(-1)" large>
                    mdi-arrow-left
                </v-icon>
            </v-col>
            <v-col class="col text-h5 col-4">
                <v-chip elevation="10" color="primary" class="rounded-pill grey lighten-4">
                    {{quest.title}}
                </v-chip>
            </v-col>
            <v-col class="col col-2"></v-col>
        </v-row>
        <v-main v-if="quest.stages" class="pa-2 mt-4">
            <User class="mb-2" v-for="item in users" :key="item.user.id" :user="item.user" :now="item.progress" :all="quest.stages.length"/>
        </v-main>
        
    </div>
</template>


<script>
import { mapGetters, mapState } from 'vuex'
import Header from '~/components/UI/Header'
import User from '~/components/watch/User.vue'
import { setInterval } from 'timers';
export default {
    created(){
        this.id=this.$route.params.id
        this.interval = setInterval(()=>{
            this.$axios.get(`/getCreatedQuest?id=${this.id}`).then(res=>{
                this.users = res.data.data
            })
        }, 2000)
        
        
        this.$axios.get(`/getQuest?id=${this.id}`).then(res=>{
            this.quest = res.data.data
        })
    },
    destroyed() {
        clearInterval(this.interval)
    },
    data(){
        return{
            id: 0,
            quest: {},
            users: [],
            interval: 0
        }
    },
    components:{
        Header,
        User
    },
    computed:{
        ...mapState('auth', ['isLoggedIn', 'user']),

    }
}
</script>

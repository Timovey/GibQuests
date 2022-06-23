<template>
    <div>
        <Header title='Ваши квесты'/>
        <v-main class="pa-2 mt-4">
            <Search :placeholder="'Найти среди своих'" @search="search"/>
            <Quest @remove="remove(item)" class="mb-2" edit v-for="(item, key) in quests" :key="key" :item="item"/>
            <Add @click="createNew" class="mt-5"><v-list>
                <v-list-item-group>
                        <v-list-item @click="createNew" color="primary">
                            <v-list-item-title>Новый квест</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list></Add>
        </v-main>
    </div>
</template>

<script>
import Header from '~/components/UI/Header.vue'
import Search from '~/components/UI/Search.vue'
import Quest from '~/components/Quest.vue'
import Add from '~/components/UI/Add'
import { mapState } from 'vuex'
export default {
    components: {
        Header,
        Search,
        Quest,
        Add
    },
    layout: 'needToLog',
    data(){
        return{
            quests: {}
        }
    },
    created(){
        if(!this.isLoggedIn) this.$router.push('/login')
        this.$axios.get(`getCreatedQuests?id=${this.user.id}`).then((res)=>{
            this.quests = res.data.data
        })
    },
    methods: {
        search(e){
        },
        createNew(){
            this.$store.commit('create/removeCurrentQuest')
            this.$router.push(`/create/new`)
        },
        remove(e){
            this.$axios.delete(`/deleteQuest?id=${e.id}`).then(res=>{
                console.log(res)
                if (res.data.status=='ok') this.quests = this.quests.filter(item=>item.id!=e.id)
            })
        }
    },
    computed: {
        ...mapState('auth', ['user', 'isLoggedIn'])
    }
}
</script>


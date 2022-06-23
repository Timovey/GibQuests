<template>
    <div v-if="quest">
        <Header title='QuestGib'/>
        <div @click="$router.go(-1)" class="my-3">
            <v-icon large>
                mdi-arrow-left
            </v-icon>
        </div>
        <v-main class="pa-2 mt-4">
            <v-img class="d-flex text-center align-center" max-height="400px" gradient="to top right, rgba(0,0,0,.4), rgba(25,32,72,.6)" dark  :src="quest.image">
                <div class="text-h4">{{quest.title}}</div>
            </v-img>
            <v-card class="text-body-1 pa-2 mt-2" v-html="quest.description"/>
            <div class="text-h5 mt-2">Этапы</div>
            <Stage v-for="(item, idx) in quest.stages" class="mt-4" :key="idx" :idx="idx" :stage="item"/>
            <div class="d-flex mt-4">
                <v-spacer/><v-btn :to="`/go/${quest.id}`" color="primary">Пройти</v-btn>
            </div>
        </v-main>
    </div>
</template>


<script>
import Header from '~/components/UI/Header'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            id: 0,
            quest: {}
        }
    },
    created(){
        this.id = this.$route.params.id
        this.$axios.get(`/getQuest?id=${this.id}`).then((res)=>{
            this.quest=res.data.data
        })
    },
    components:{
        Header
    }
}
</script>

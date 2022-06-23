<template>
    <div v-if="quest && quest.stages">
        <Header title='QuestGib'/>
        <v-row class="my-3 d-flex justify-space-between text-center align-center">
            <v-col no-gutters class="col col-2">
                <v-icon @click="$router.go(-1)" large>
                    mdi-arrow-left
                </v-icon>
            </v-col>
            <v-col class="col text-h5 col-4">
                <v-card v-if="currentStage" class="rounded-pill grey lighten-4">
                    Этап <span class="primary--text">{{currentStageNumber+1}}</span>
                </v-card>
                <v-card v-else class="rounded-pill grey lighten-4">
                   <span class="primary--text">Всё!</span>
                </v-card>
            </v-col>
            <v-col class="col col-2"></v-col>
        </v-row>
        <v-main v-if="currentStage" class="pa-2 mt-4">
            <v-card class="relative">
                <v-chip small class="stage-chip">{{currentStage.type}}</v-chip>
                <div class="primary--text pa-2 text-h6 text-center">
                    {{currentStage.name}}
                </div>
                <VideoStage 
                    @stageComplete="stageComplete" 
                    v-if="currentStage.stageAction && 
                    currentStage.stageAction.url" 
                    :url="currentStage.stageAction.url"/>
                <TextStage 
                    v-if="currentStage.stageAction 
                    && currentStage.stageAction.text" 
                    :text="currentStage.stageAction.text"/>
                <MapStage 
                    v-if="currentStage.stageAction && 
                    currentStage.stageAction.lat"  
                    :key="currentStageNumber+1" 
                    @stageComplete="stageComplete"
                    :goalLat="currentStage.stageAction.lat" 
                    :goalLong="currentStage.stageAction.long"/>
                <QRStage 
                    v-if="currentStage.stageAction && 
                    currentStage.stageAction.to" 
                    @stageComplete="stageComplete" 
                    :codeWord="currentStage.stageAction.to"/>
                <TestStage 
                    v-if="currentStage.stageTest && 
                    currentStage.stageTest.questions"  
                    @stageComplete="stageComplete" 
                    :questions="currentStage.stageTest.questions"/>
                <v-card-actions>
                    <v-btn :disabled="!currentStageNumber" @click="previousStage" dark color="blue">Назад</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!showBtn" @click="nextStage" color="primary">Далее</v-btn>
                </v-card-actions>   
            </v-card>
        </v-main>
        <v-container v-else class="d-flex align-center flex-column justify-center w-100">
            <v-btn large to="/" fab color="success">
                <v-icon>
                    mdi-check
                </v-icon>
            </v-btn>
            <div class="text-h3">
                Ты умница!
            </div>
        </v-container>
        <Progress 
            :goal="quest.stages && quest.stages.length" 
            :current="currentStageNumber >= quest.stages.length ? quest.stages.length-1 : currentStageNumber"/>
    </div>
</template>


<script>
import Header from '~/components/UI/Header'
import VideoStage from '~/components/Go/VideoStage'
import TextStage from '~/components/Go/TextStage'
import MapStage from '~/components/Go/MapStage'
import QRStage from '~/components/Go/QRStage'
import TestStage from '~/components/Go/TestStage'
import Progress from '~/components/Go/Progress'
import { mapGetters, mapState } from 'vuex'

export default {
    components:{
        Header,
        VideoStage,
        TextStage,
        MapStage,
        QRStage,
        TestStage,
        Progress
    },
    created() {
        if(!this.user.id) this.$router.push('/login')
    },
    mounted(){
        this.id = this.$route.params.id
       
        this.$axios.get(`/getQuest?id=${this.id}`).then((res)=>{
            this.quest=res.data.data
            let data = {
                userId: this.user.id,
                questId: this.quest.id
            }
            this.$axios.post('/processQuest', data).then(res=>{
            })
            this.$axios.get(`/getProcessQuest?userId=${this.user.id}&questId=${this.quest.id}`)
                .then(res=>{
                    this.currentStageNumber=res.data.data.progress-1
                })
        })
        

    },
    layout: 'needToLog',
    data(){
        return{
            quest: {},
            id: 0,
            currentStageNumber: 0,
            showBtn: false
        }
    },
    methods: {
        stageComplete(){
            this.showBtn = true
        },
        nextStage(){
            this.showBtn = false
            
            this.currentStageNumber++
            let data = {
                userId: this.user.id,
                questId: this.quest.id,
                progress: this.currentStageNumber
            }
            this.$axios.post('/processQuest', data).then(res=>{
            })
        },
        previousStage(){
            this.showBtn = true
            this.currentStageNumber--
        }
    },
    computed:{
        ...mapState('auth', ['isLoggedIn', 'user']),
        currentStage() {
            let stage = {}
            if(this.quest && this.quest.stages){
                stage = this.quest.stages[this.currentStageNumber]
            }
            if(stage && stage.type === 'Текст') {
                this.showBtn = true
            }
            return stage || false
        }
    }
}
</script>

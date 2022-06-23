<template>
    <div>
        <Header title='Создать'/>
        <v-main class="pa-2 mt-4">
            <v-row class="my-3 d-flex justify-space-between text-center align-center">
                <v-col no-gutters class="col col-2">
                    <v-icon @click="$router.push('/yours')" large>
                        mdi-arrow-left
                    </v-icon>
                </v-col>
                <v-col class="col secondary--text text-h6 col-6">
                {{quest.title}}
                </v-col>
                <v-col class="col col-2"></v-col>
            </v-row>
            <v-text-field 
                @input="$v.quest.title.$touch()"
                @blur="$v.quest.title.$touch()"
                v-model="quest.title"
                :error-messages="titleErrors"
                :counter="20" solo label="Название"
            />
            <div class="text-h5">Описание</div>
            <v-card v-ripple="false" @click="$v.quest.description.$touch()"
                @blur="$v.quest.description.$touch()" class="mt-2 mb-2">
                <wysiwyg v-model="quest.description"/>
            </v-card>
            <v-alert
                border="top"
                color="red lighten-2"
                v-if="descriptionErrors.length"
                dark
            >
                    {{descriptionErrors[0]}}
            </v-alert>
            <ImageInput 
                @click="$v.quest.image.$touch()" 
                :class="{'redBorder': imageErrors.length}" 
                @change="setImage" 
                :background="background"/>
            <v-alert
                class="mt-2"
                border="top"
                color="red lighten-2"
                v-if="imageErrors.length"
                dark
            >
                {{imageErrors[0]}}
            </v-alert>
            <div class="mt-4 mb-8 d-flex align-center justify-space-between">
                <div class="text-h5">Этапы</div>
                <Shuffling v-if="quest.stages && quest.stages.length" @shuffleComplete="shuffleComplete" :items="quest.stages"/>
            </div>
            <wrapper :key="key">
                <Stage 
                    v-for="(item, idx) in quest.stages" :key="idx" 
                    class="mb-7"
                    :class="{'redBorder': myStagesErrors[idx]}" 
                    :item="item" 
                    :idx="idx" 
                    @remove="removeStage(idx)"
                    @createQR="createQR(idx)"
                    @createText="createText(idx)"
                    @createTest="createTest(idx)"
                    @createMap="createMap(idx)"
                    @stageChange="stageChange($event, idx)"
                />
            </wrapper>
            <v-alert
                class="mt-2"
                border="top"
                color="red lighten-2"
                v-if="stagesErrors.length"
                dark
            >
                {{stagesErrors[0]}}
            </v-alert>
            <v-alert
                class="mt-2"
                border="top"
                color="red lighten-2"
                v-if="myStagesErrors.length"
                dark
            >
                Поля в этапах не могут быть пустыми
            </v-alert>
            <Add class="mt-4">
                <v-list>
                    <v-list-item-group>
                        <v-list-item @click="addStage(item)" v-for="item in types" :key="item" color="primary">
                            <v-list-item-title>{{item}}</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </Add>
            <v-card-actions class="pa-0 pt-2">
                <v-spacer/>
                <v-btn>Отмена</v-btn>
                <v-btn @click="setQuest()" color="primary">Сохранить</v-btn>
            </v-card-actions>
        </v-main>
    </div>
</template>

<script>
import Header from '~/components/UI/Header.vue'
import Search from '~/components/UI/Search.vue'
import Quest from '~/components/Quest.vue'
import Add from '~/components/UI/Add'
import Stage from '~/components/create/Stage'
import ImageInput from '~/components/UI/ImageInput'
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import Shuffling from '~/components/create/Shuffling.vue'
import wrapper from '~/components/UI/wrapper'

export default {
    mixins: [validationMixin],
    layout: 'needToLog',
    validations: {
        quest: {
            title: { required, maxLength: maxLength(20) },
            description: { required, minLength: minLength(10) },
            image: { required },
            stages: { required }
        }
    },
    mounted(){
        this.currentId = this.$route.params.id
        this.quest = this.$store.getters['create/getCurrentQuest']
        if(this.currentId != 'new'){
            if(this.quest.id && this.quest.id!='new') return
            this.$axios.get(`/getQuest?id=${this.currentId}`).then(res=>{
                this.quest = res.data.data
                this.$store.commit('create/setCurrentQuest', this.quest)
                this.background = this.quest.image
            })
        }
        if(this.currentId!=this.quest.id){
            // this.$router.push(`/create/${this.quest.id}`)
        }
    },
    data(){
        return{
            key: 0,
            currentId: '',
            background: '',
            types:[
                'Текст',
                'Видео',
                'QR',
                'Карта',
                'Тест'
            ],
            quest:{
                title: 'Новый'
            },
        }
    },
    components: {
        Header,
        Search,
        Quest,
        Add,
        ImageInput,
        Stage,
        Shuffling,
        wrapper
    },
    methods: {
        search(e){
        },
        stageChange(e, idx){
            this.myStagesErrors
            this.quest.stages[idx] = e
        },
        setImage(e){
            this.quest={
                ...this.quest,
                image: e
            }
            let reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload = function () {
                this.background = reader.result
            }.bind(this);
            this.$store.commit('create/setCurrentQuest', JSON.parse(JSON.stringify(this.quest)))
            if(this.currentId!='new'){
                let data = new FormData()
                data.append('image', e, e.name)
                this.$axios.post(`/updateImage?id=${this.currentId}`, data).then((res)=>{
                })
            }
        },
        createTest(id){
            this.$store.commit('create/setCurrentStage', JSON.parse(JSON.stringify(this.quest.stages[id])))
            this.$router.push(`/create/test/${id}`)
        },
        createText(id){
            this.$store.commit('create/setCurrentStage', JSON.parse(JSON.stringify(this.quest.stages[id])))
            this.$router.push(`/create/text/${id}`)
        },
        createMap(id){
            this.$store.commit('create/setCurrentStage', JSON.parse(JSON.stringify(this.quest.stages[id])))
            this.$router.push(`/create/map/${id}`)
        },
        createQR(id){
            this.$store.commit('create/setCurrentStage',JSON.parse(JSON.stringify(this.quest.stages[id])))
            this.$router.push(`/create/QR/${id}`)
        },
        addStage(type){
            this.$v.quest.stages.$touch()
            let toPush =  {
                number: this.quest.stages.length+1,
                name: `Этап ${this.quest.stages.length+1}`,
                type,
            }
            if(type=='Видео') toPush.url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' 
            this.quest.stages.push(toPush)
            this.$store.commit('create/setCurrentQuest', JSON.parse(JSON.stringify(this.quest)))
            this.$store.commit('create/setCurrentStage', toPush)
        },
        removeStage(idx){
            this.quest.stages.splice(idx, 1)
            this.$store.commit('create/setCurrentQuest', JSON.parse(JSON.stringify(this.quest)))
        },
        shuffleComplete(stages){
            this.key++
            this.quest.stages=JSON.parse(JSON.stringify(stages))
        },
        setQuest(){
            this.$v.quest.$touch()
            if(!this.$v.quest.$anyError && this.summaryStagesErrors){
                if(this.currentId=='new'){
                    this.$axios.post('/create', {
                        ...this.quest,
                        author: {
                            ...this.user
                        }
                    }).then(res=>{
                        this.currentId = res.data.data.id
                        const e = this.quest.image
                        let data = new FormData()
                        data.append('image', e, e.name)
                        this.$axios.post(`/updateImage?id=${this.currentId}`, data).then((res)=>{
                            this.$router.push(`/create/${this.currentId}`)
                            this.$store.commit('create/setCurrentQuest', this.quest)
                        })
                    })
                } else {
                    this.$axios.post('/create', {
                        ...this.quest,
                        author: {
                            ...this.user
                        }
                    }).then(res=>{
                        this.currentId = res.data.data.id
                        this.$router.push(`/create/${this.currentId}`)
                    })
                }
            }
        }
    },
    computed: {
        ...mapState('auth', ['user', 'isLoggedIn']),
        ...mapState('create', ['createdQuests']),
        titleErrors () {
            const errors = []
            if (!this.$v.quest.title.$dirty) return errors
            !this.$v.quest.title.maxLength && errors.push('Это, блять, название, а не сочинение')
            !this.$v.quest.title.required && errors.push('И как тебя, долбоёба, нез названия найти?')
            return errors
        },
        descriptionErrors () {
            const errors = []
            if (!this.$v.quest.description.$dirty) return errors
            !this.$v.quest.description.minLength && errors.push('А вот это как раз сочинение, а не название')
            !this.$v.quest.description.required && errors.push('Ну да, описание нам нахуй не нужно')
            return errors
        },
        imageErrors () {
            const errors = []
            if (!this.$v.quest.image.$dirty) return errors
            !this.$v.quest.image.required && errors.push('Без картинки ваще заебись, конечно')
            return errors
        },
        stagesErrors () {
            const errors = []
            if (!this.$v.quest.stages.$dirty) return errors
            !this.$v.quest.stages.required && errors.push('Да, бля, а проходить он че будет?')
            return errors
        },
        summaryStagesErrors(){
            for (let i of this.myStagesErrors){
                if (i) return false
            }
            return true
        },
        myStagesErrors () {
            const errors = []
            if (!this.$v.quest.stages.$dirty) return errors
            for(let i in this.quest.stages){
                if(!this.quest.stages[i].name) errors[i]=true
                if(this.quest.stages[i].type=='Текст'){
                    if(!this.quest.stages[i].text) errors[i]=true
                }
                if(this.quest.stages[i].type=='Видео'){
                    const reg = new RegExp(/https:\/\/(www.|.{0,})youtube\.com\/watch\?v=.{3,}/)
                    if(!(this.quest.stages[i].url && reg.test(this.quest.stages[i].url.toLowerCase()))) errors[i]=true
                }
                if(this.quest.stages[i].type=='QR'){
                    if(!this.quest.stages[i].to) errors[i]=true
                }
                if(this.quest.stages[i].type=='Карта'){
                    if(!this.quest.stages[i].lat || !this.quest.stages[i].long) errors[i]=true
                }
            }
            return errors
        },
    }
}
</script>

<style>
  .redBorder{
    border: 2px solid red  !important
  }
</style>



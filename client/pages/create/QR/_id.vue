<template>
    <div>
        <Header title='Генерировать код'/>
        <v-main class="pa-2 mt-4">
            <v-row class="my-3 d-flex justify-space-between text-center align-center">
                <v-col no-gutters class="col col-2">
                    <v-icon @click="$router.go(-1)" large>
                        mdi-arrow-left
                    </v-icon>
                </v-col>
                <v-col class="col secondary--text text-h6 col-6">
                {{quest.id}} / {{id}}
                </v-col>
                <v-col class="col col-2"></v-col>
            </v-row>
            <v-text-field 
                v-model="stage.to"
                @input="$v.stage.to.$touch(); qrChange()"
                @blur="$v.stage.to.$touch()"
                :error-messages="toErrors"
                solo label="Кодовое слово"/>
            <v-btn class="w-100" color="primary">Сгенерировать</v-btn>
            <div>
                <h2 class="text-body-1 my-2">Текущий код</h2>
                <v-card>
                    <v-img contain width="100%" class="qr" :src="qr">
                        <v-btn download="qr.png" :href="qr" fab color="warning" small class="download">
                            <v-icon>mdi-download</v-icon>
                        </v-btn>
                    </v-img>
                </v-card>
                <v-card-actions class="pa-0 mt-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="$router.go(-1)" text>Назад</v-btn>
                    <v-btn @click="setStage" color="primary">Сохранить</v-btn>
                </v-card-actions>
            </div>
        </v-main>
        <v-snackbar v-model="snackbar">
            Изменения сохранены
            <template v-slot:action="{ attrs }">
                <v-btn class="primary--text" text small @click="snackbar=!snackbar">
                    Закрыть
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import Header from '~/components/UI/Header'
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength} from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],
    validations: {
        stage: {
            to: { required, minLength: minLength(2) }
        }
    },
    components:{
        Header
    },
    created(){
        this.id = this.$route.params.id
        this.quest = {...this.$store.getters['create/getCurrentQuest']}
        this.stage = {...this.$store.getters['create/getCurrentStage']}
        if (this.stage.to){
            this.$axios.get(`/getQr?word=${this.stage.to}`).then(res=>{
                this.qr = res.data.data
            })
        }
        if(this.stage && this.stage.type !='QR') this.$router.go(-1)
    },
    data(){
        return{
            stage: '',
            qr: '',
            id: 0,
            codeWord: '',
            snackbar: false
        }
    },
    methods: {
        setStage(){
            this.$v.stage.$touch()
            if(this.$v.stage.$anyError) return
            this.quest.stages[this.id] = this.stage
            this.$store.commit('create/setCurrentQuest', this.quest)
            this.snackbar = true
        },
        qrChange(stage){
            if(this.stage.to.length>1){
                this.$axios.get(`/getQr?word=${this.stage.to}`).then(res=>{
                    this.qr = res.data.data
                })
            }
        }
    },
    computed:{
        ...mapState('create', ['currentStage']),
        toErrors(){
            const errors = []
            if(!this.$v.stage.to.$dirty) return errors
            !this.$v.stage.to.minLength && errors.push('Слишком короткое кодовое слово')
            !this.$v.stage.to.required && errors.push('Кодовое слово обязательно')
            return errors
        }
    }
}
</script>

<style lang="scss">
    .qr{
        position: relative;
    }
                
    .download{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
</style>



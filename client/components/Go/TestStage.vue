<template>
    <v-stepper v-model="count" vertical elevation="0">
        <Fragment :key="idx" v-for="(question, idx) in questions">
            <v-stepper-step :step="idx+1">
               {{question.contain}}
            </v-stepper-step>
            <v-stepper-content :step="idx+1">
                <Multiple @questionAnswer="permission=true" v-if="question.type=='Множественный выбор'" :question="question"/>
                <Once @questionAnswer="permission=true" v-if="question.type=='Выбор'" :question="question"/>
                <Insert @questionAnswer="permission=true" v-if="question.type=='Вписать ответ'" :question="question"/>
                <Order v-if="count==idx+1 && question.type=='Расположить по порядку'" @questionAnswer="permission=true" :question="question"/>
                <div class="d-flex">
                    <v-spacer/>
                    <v-btn color="primary" :disabled="!permission" @click="nextQuestion(idx)">Следующий</v-btn>
                </div>
            </v-stepper-content>
        </Fragment>     
    </v-stepper>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Multiple from '~/components/Go/Test/Multiple'
import Once from '~/components/Go/Test/Once'
import Insert from '~/components/Go/Test/Insert'
import Order from '~/components/Go/Test/Order'
export default {
    components:{
        Fragment,
        Multiple,
        Once,
        Insert,
        Order
    },
    data(){
        return{
            count: 1,
            permission: false
        }
    },
    props:{
        questions:{
            type: Array,
            required: true
        }
    },
    methods:{
        nextQuestion(idx){
            this.permission = false
            this.count = idx+2
        }
    },
    watch:{
        count(val){
            if(this.count == this.questions.length+1){
                this.$emit('stageComplete')
            }
        }
    }
    
}
</script>

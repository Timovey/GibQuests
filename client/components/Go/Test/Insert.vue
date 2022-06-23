<template>
    <div>
        <v-text-field
            v-model="answer"
            solo
            :readonly="flag"
            label="Впишите ответ"
        ></v-text-field>
    </div>
</template>

<script>
export default {
    data(){
        return{
            answer: '',
            flag: false
        }
        
    },
    props: {
        question:{
            type: Object,
            required: true
        }
    },
    watch:{
        answer(val){
            if(val.toLowerCase().trim() == this.question.rightAnswer[0].toLowerCase().trim()){
                this.$emit('questionAnswer')
                this.flag=true
            }
        }
    }
}
</script>


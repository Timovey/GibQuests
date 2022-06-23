<template>
    <v-radio-group v-model="answer">
        <v-radio
            class="mt-2 px-2"
            :readonly="flag"
            v-ripple="false"
            v-for="(item, idx) in question.answers"
            :key="idx"
            :label="item"
            :value="item"
        ></v-radio>
    </v-radio-group>
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
            console.log(this.question.rightAnswer[0])
            if(this.question.rightAnswer[0].toLowerCase().trim()==val.toLowerCase()) {
                this.$emit('questionAnswer')
                this.flag=true
            }
        }
    }
}
</script>


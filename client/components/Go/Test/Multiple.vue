<template>
    <div>
        <v-checkbox
            class="px-2"
            v-ripple="false"
            v-for="(item, idx) in question.answers"
            :key="idx"
            :readonly="flag"
            v-model="answer"
            :label="item"
            :value="item"
        ></v-checkbox>
    </div>
</template>

<script>
export default {
    data(){
        return{
            answer: [],
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
            console.log(val)
            function contains(where, what){
                if(what.length==0) return false
                for(var i=0; i<what.length; i++){
                    if(where.indexOf(what[i]) == -1) return false;
                }
                return true;
            }
            if(val.length && contains(this.question.rightAnswer, this.answer)) {
                this.$emit('questionAnswer')
                this.flag=true
            }
        }
    }
}
</script>


<template>
    <v-card-text class="text-body-1" v-html="text"></v-card-text>
</template>

<script>
export default {
    mounted(){
        this.$emit('stageComplete')
    },
    props:{
        text:{
            required: true,
            type: String
        }
    }
}
</script>


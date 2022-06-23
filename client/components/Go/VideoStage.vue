<template>
    <iframe width="100%" height="300" :src="computedSrc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
</template>

<script>
export default {
    mounted(){
        window.focus()
        let ctx = this
        window.onblur = function(){
            var monitor = setInterval(function(){
                var elem = document.activeElement;
                if(elem && elem.tagName == 'IFRAME'){
                    setTimeout(()=>{ctx.$emit('stageComplete')}, 7000)
                    clearInterval(monitor)
                }
            }, 100)
        }
    },
    props:{
        url:{
            type: String,
            required: true
        }
    },
    destroyed() {
        window.onblur = function(){}
    },
    methods: {
    },
    computed:{
        computedSrc(){
            const viewCode = this.url.split('=')[1]
            return `https://www.youtube.com/embed/${viewCode}`
        }
    }
}
</script>

<template>
    <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
            v-bind="attrs"
            v-on="on" fab small color="success">
            <v-icon>mdi-shuffle</v-icon>
        </v-btn>
      </template>
      <v-sheet
        class="text-center"
        height="700px"
      >
        <v-btn
          class="mt-2"
          text
          color="primary"
          @click="shuffleComplete"
        >
          Сохранить
        </v-btn>
        <Container
            @drop="onDrop"
            orientation='vertical'
        >
            <Draggable 
                v-for="(item, idx) in stages"
                :key="idx"
                class="pa-2"
            >
                <Stage class="mb-4" :idx="idx" :stage="item"/>
            </Draggable>
        </Container>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import Stage from '~/components/Stage'
import { Container, Draggable } from "vue-dndrop";
import { applyDrag } from "@/helpers/applyDrag.js";
export default {
    components:{
        Container,
        Draggable,
        Stage
    },
    mounted() {
        this.stages = [...this.items]
    },
    data(){
        return{
            stages: [],
            sheet: false
        }
    },
    props:{
        items: []
    },
    methods: {
        onDrop(dropResult) {
            this.stages = applyDrag(this.stages, dropResult);
        },
        shuffleComplete(){
            this.sheet = false
            this.$emit('shuffleComplete', this.stages)
        }
    },
    watch:{
        items(){
            this.stages=this.items
        }
    }
}
</script>


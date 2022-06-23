<template>
    <v-card shaped>
        <v-card-text class="d-flex py-6 pb-2 stage-wrapper justify-space-between align-center">
            <v-chip small class="stage-chip">{{stage.type}}</v-chip>
            <v-btn x-small class="stage-index" color="success" fab>
                <div class="text-caption">
                    {{idx+1}}
                </div>
            </v-btn>
            <div class="d-flex flex-grow-1 px-2 flex-column">
                <v-text-field v-model="stage.name" clearable label="Название этапа" solo/>
                <v-text-field v-model="stage.url" v-if="stage.type==='Видео'" clearable label="Url видео" solo/>
                <v-btn color="primary" @click="createText" v-if="stage.type==='Текст'">Редактор текста</v-btn>
                <v-btn color="primary" @click="createTest" v-else-if="stage.type==='Тест'">Редактор тестов</v-btn>
                <v-btn color="primary" @click="createMap" v-else-if="stage.type==='Карта'">Редактор карт</v-btn>
                <v-btn color="primary" @click="createQR" v-else-if="stage.type==='QR'">QR-генератор</v-btn>
            </div>
            <v-btn small color="error" fab>
                <v-icon @click="$emit('remove')" class="text-h6">
                    mdi-delete
                </v-icon>
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    created(){
        this.stage = {...this.item}
        if(this.stage.stageAction && this.stage.stageAction.url){
            this.stage.url = this.stage.stageAction.url
        }

    },
    data(){
        return{
            stage: {}
        }
    },
    props:{
        item:{
            type: Object,
            required: true
        },
        idx:{
            type: Number,
            required: true
        }
    },
    methods:{
        createQR(){
            this.$emit('createQR')
        },
        createMap(){
            this.$emit('createMap')
        },
        createText(){
            this.$emit('createText')
        },
        createTest(){
            this.$emit('createTest')
        }
    },
    watch:{
        stage:{
            handler: function(val){
                this.$emit('stageChange', val)
            },
            deep: true
        }
    }
}
</script>

<style>
    .stage-wrapper{
        position: relative;
    }
    .stage-chip{
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-50%)
    }
    .stage-index{
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-50%) translateX(-10%)
    }
</style>

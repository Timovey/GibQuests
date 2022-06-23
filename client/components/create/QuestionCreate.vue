<template>
    <v-container class="pa-0" @click="handleTestChange">
        <v-card class="mt-3 mb-6" v-for="(item, index) in questions" :key="index" shaped >
            <v-card-title>Вопрос {{index+1}}</v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="item.contain"
                    label="Cодержание вопроса"
                    hint="Содержание вопроса"
                    clearable
                    solo
                    filled
                    dense
                    required
                ></v-text-field>
                <v-select
                    v-model="item.type"
                    :items="types"
                    label="Тип вопроса"
                    required
                ></v-select>
                <v-card-subtitle>
                    Варианты ответа
                </v-card-subtitle>
                <v-divider dark class="mb-3"></v-divider>
                <div v-if="item.type=='Выбор' || item.type=='Множественный выбор'" class="selections">
                    <v-row
                        v-for="(answer, j) in item.answers"
                        :key="j"
                    >
                        <v-text-field
                            class="ml-3"
                            clearable
                            solo
                            :hint="`Вариант ${j+1}`"
                            :label="`Вариант ${j+1}`"
                            v-model="item.answers[j]"
                        
                        >
                        </v-text-field>
                        <v-btn
                            @click="removeAnswer(index, j)"
                            class="ma-2"
                            fab
                            dark
                            x-small
                            color="red"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="addAnswer(index)"
                            class="mb-4"
                            fab
                            dark
                            small
                            color="success"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                    <v-select
                        :items="item.answers"
                        label="Верный ответ"
                        color="success"
                        outlined
                        multiple
                        v-model="item.rightAnswer"
                        v-if="item.type ==='Множественный выбор'"
                    ></v-select>
                    <v-select
                        :items="item.answers"
                        label="Верный ответ"
                        color="success"
                        outlined
                        v-else
                        v-model="item.rightAnswer[0]"
                    ></v-select>
                </div>
                <div v-if="item.type=='Вписать ответ'" class="selections">
                    <v-text-field
                        :items="item.answers"
                        label="Верный ответ"
                        color="success"
                        outlined
                        v-model="item.rightAnswer[0]"
                    ></v-text-field>
                </div>
                <div @click="setCurrentDrag(index)" v-if="item.type=='Расположить по порядку'" class="selections">
                    <Container
                        @drop="onDrop({index, ...$event})"
                        orientation='vertical'
                    >
                        <Draggable 
                            v-for="(answer, j) in item.answers"
                            :key="j"
                        >
                            <div class="draggable-item">
                            <v-row>
                                <v-text-field
                                    class="ml-1"
                                    clearable
                                    solo
                                    :hint="`Вариант ${j+1}`"
                                    :label="`Вариант ${j+1}`"
                                    v-model="item.answers[j]"
                                >
                                </v-text-field>
                                <v-btn
                                    @click="removeAnswer(index, j)"
                                    class="my-2 ml-2  curp"
                                    fab
                                    dark
                                    x-small
                                    elevation="2"
                                    color="red"
                                >
                                    <v-icon x-small dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>
                            </v-row>
                            </div>

                        </Draggable>
                    </Container>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="addAnswer(index)"
                            class="mb-4"
                            fab
                            dark
                            small
                            color="success"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-row>
                </div>
            </v-card-text>
        </v-card>
        <Add class="mt-4">
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for="(type, idx) in types" :key="idx" @click="addQuestion(type)" color="primary">
                        <v-list-item-title>{{type}}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </Add>
    </v-container>
</template>


<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag } from "@/helpers/applyDrag.js";
import Add from '~/components/UI/Add'
export default {
    components:{
        Container,
        Draggable,
        Add
    },
    props:{
        quests: Array
    },
    data() {
        return {
            types: [
                'Множественный выбор',
                'Выбор',
                'Вписать ответ',
                'Расположить по порядку'
            ],
            typeRules: [val => (val || '').length > 0 || 'This field is required'],
            questions: [],
            currentDrag: 0,
            tt: 0
        }
    },
    beforeMount() {
        this.questions = JSON.parse(JSON.stringify(this.quests))
    },
    methods: {
        handleTestChange(){
            this.$emit('testChange', this.questions)
        },
        addAnswer(i){
            this.questions[i].answers.push(`Ёлки иголки`)
        },
        removeAnswer(i,j){
            this.questions[i].answers.splice(j,1)
        },
        onDrop(dropResult) {
            let i = dropResult.index
            this.questions[i].answers = applyDrag(this.questions[i].answers, dropResult);
            this.questions[i].rightAnswer = this.questions[i].answers 
            console.log(this.questions[i])
        },
        setCurrentDrag(index){
            this.currentDrag = index
            this.questions[index].rightAnswer = this.questions[i].answers
        },
        addQuestion(type){
            this.questions.push({
                number: this.questions.length ? this.questions.length: 0, 
                contain: 'При чём здесь ёжики?',
                answers: [
                    'Смешарики',
                    'Лошарики',
                    'Кикорики'
                ],
                type: type,
                rightAnswer: ['Смешарики']
            })
        }
    },
    watch:{
        questions:{
            handler:function(){
                this.$emit('testChange', this.questions)
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
    .draggable-item{
        .v-input{
            margin-left: 0;
            max-width: 80%;
        }
        input{
        }
        padding: 10px !important
    }
</style>


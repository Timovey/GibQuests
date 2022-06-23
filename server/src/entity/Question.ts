import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import {Stage_Test} from './Stage_Test';

export type QuestionEnum = 'Множественный выбор'| 'Выбор'| 'Вписать ответ'| 'Расположить по порядку'
export const QuestionEnumArray = ['Множественный выбор', 'Выбор', 'Вписать ответ', 'Расположить по порядку']

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    number: number

    @Column({
        length:50,
        nullable: false
    })
    contain: string

    @Column({
        type: "enum",
        enum: QuestionEnumArray,
        default: 'Выбор',
        nullable: false
    })
    type: QuestionEnum
    

    @ManyToOne(() => Stage_Test, (stageTest) => stageTest.questions, {onDelete: "CASCADE"})
    stageTest: Stage_Test

    // @OneToMany(() => Answer, (answer) => answer.question, {cascade: true})
    // answer: Answer

    // @OneToMany(() => RightAnswer, (rightAnswer) => rightAnswer.question, {cascade: true})
    // rightAnswer: RightAnswer

    @Column({type:"text",  array: true })
    answers: any;
    
    @Column({type:"text",  array: true})
    rightAnswer: any;
}

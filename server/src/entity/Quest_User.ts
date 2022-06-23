import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {User} from './User';
import {Quest} from './Quest';

@Entity()
export class Quest_User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    progress: number

    @ManyToOne(() => User, (user) => user.quest_user, {onDelete: "CASCADE"})
    user: User

    @ManyToOne(() => Quest, (quest) => quest.quest_user, {onDelete: "CASCADE"})
    quest: Quest

}

import { Quest } from '../entity/Quest';
import { User } from "../entity/User";
import { NotFoundError, UnexpectedError, UnexpectedDBError } from "../error";
import { catchOrmErrors } from "./utils";
import { AppDataSource } from "../data-source"
import { Stage, StageEnumArray} from '../entity/Stage';
import { StageDto, QuestionDto } from '../controllers/dto';
import { StageActionMapDto, StageActionMediaDto, StageActionQrDto, StageActionTextDto } from '../controllers/dto/StageActionDto';
import { Stage_Test } from '../entity/Stage_Test';
import { Question } from '../entity/Question';
import { Stage_Action } from '../entity/Stage_Action';
import { Quest_User } from '../entity/Quest_User';
import * as QRCode from 'qrcode';

async function saveQuestion(q: QuestionDto, stageTest: Stage_Test) {
    const questionRep = AppDataSource.getRepository(Question);

    let question = new Question()
    
    question.number = q.number
    question.contain = q.contain
    question.type = q.type
    question.stageTest = stageTest
    question.rightAnswer = q.rightAnswer
    question.answers = q.answers
    const saveQuest = await questionRep.save(question)
    
    // q.answers.forEach(a => {
    //     let answer = new Answer()
    //     answer.question = question
    //     answer.value = a.value
    //     answerRep.save(answer)
    // })
    // q.rightAnswers.forEach(r => {
    //     let rightAnswer = new RightAnswer()
    //     rightAnswer.question = question
    //     rightAnswer.value = r.value
    //     rightAnswerRep.save(rightAnswer)
    // })
}

export class QuestService {
    public static async add(title: string, description: string, stages: StageDto[], username: string): Promise<Quest> {
        const questRep = AppDataSource.getRepository(Quest);
        const stageRep = AppDataSource.getRepository(Stage);
        const userRep = AppDataSource.getRepository(User);
        const stageTestRep = AppDataSource.getRepository(Stage_Test);
        const stageActionRep = AppDataSource.getRepository(Stage_Action);
        // const questionRep = AppDataSource.getRepository(Question);
        // const answerRep = AppDataSource.getRepository(Answer);
        // const rightAnswerRep = AppDataSource.getRepository(RightAnswer);
        return catchOrmErrors(async () => {
            const quest = new Quest();
            quest.title = title;
            quest.description = description;
            const author = await userRep.findOneBy({username}); 
            quest.author = author
            const resQuestSave = await questRep.save(quest)

            await stages.forEach(async function(s) {
                let stage = new Stage()
                stage.name = s.name
                stage.number = s.number
                stage.quest = quest
                stage.type = s.type
                await stageRep.save(stage)
                
                if(stage.type === "Тест") {
                    // console.log(s);
                    const stageTest = new Stage_Test()
                    stageTest.stage = stage
                    stageTest.title = s.test.title
                    await stageTestRep.save(stageTest)
                    await s.test.questions.forEach(q => saveQuestion(q, stageTest));

                    // s.test.questions.forEach(q => {
                    //     let question = new Question()
                        
                    //     question.number = q.number
                    //     question.contain = q.contain
                    //     question.type = q.type
                    //     question.stageTest = stageTest
                    //     questionRep.save(question)
                    //     q.answers.forEach(a => {
                    //         let answer = new Answer()
                    //         answer.question = question
                    //         answer.value = a.value
                    //         answerRep.save(answer)
                    //     })
                    //     q.rightAnswers.forEach(r => {
                    //         let rightAnswer = new RightAnswer()
                    //         rightAnswer.question = question
                    //         rightAnswer.value = r.value
                    //         rightAnswerRep.save(rightAnswer)
                    //     })
                    // })
                }
                else {
                    const stageAction = new Stage_Action()
                    if(stage.type === "QR") {
                        let word = (<StageActionQrDto>(s as unknown)).to

                        await QRCode.toDataURL(word, (err, src) => {
                            if (err) {
                                console.log(err); 
                                throw new UnexpectedDBError();
                            }
                            stageAction.to = src                     
                        });
                        await stageActionRep.save(stageAction)
                        
                    }
                    else if(stage.type === "Видео") {
                        stageAction.url = (<StageActionMediaDto>(s as unknown)).url
                    }
                    else if(stage.type === "Карта") {
                        stageAction.lat = (<StageActionMapDto>(s as unknown)).lat
                        stageAction.long = (<StageActionMapDto>(s as unknown)).long
                    }
                    else {
                        stageAction.text = (<StageActionTextDto>(s as unknown)).text
                    }
                    stageAction.stage = stage
                    await stageActionRep.save(stageAction)
                    
                }

            })            
             return resQuestSave;
        });
    }
   

    public static async process(userId: number, questId: number, progress?: number): Promise<Quest_User> {
        const questRep = AppDataSource.getRepository(Quest);
        const userRep = AppDataSource.getRepository(User);
        const questUserRep = AppDataSource.getRepository(Quest_User);

        const user = await userRep.findOneBy({id:userId})
        const quest = await questRep.findOneBy({id:questId})
        if(!user || !quest) {
            throw new NotFoundError('Пользователь или квест');
        }
        let questUser = await questUserRep.findOneBy({user, quest})
        
        if(!progress && !questUser) {
            let newQuestUser = new Quest_User()
            newQuestUser.progress = 1
            newQuestUser.quest = quest
            newQuestUser.user = user
            return await questUserRep.save(newQuestUser)
        }
        else if(progress && !questUser) {
            throw new NotFoundError('Прохождение квеста для пользователя');
        }
        else if(progress && questUser) {
            if(progress <= questUser.progress) {
                throw new UnexpectedError('Этап квеста меньше или равен текущему')
            }
            if(progress - 1 !== questUser.progress) {
                throw new UnexpectedError('Новый этап квеста больше чем на 1, чем текущий этап')
            }
            questUser.progress = progress
            return await questUserRep.save(questUser)
        }

    }

    public static async getProcess(userId: number, questId: number): Promise<Quest_User> {
        const questRep = AppDataSource.getRepository(Quest);
        const userRep = AppDataSource.getRepository(User);
        const questUserRep = AppDataSource.getRepository(Quest_User);

        const user = await userRep.findOneBy({id:userId})
        const quest = await questRep.findOneBy({id:questId})
        if(!user || !quest) {
            throw new NotFoundError('Пользователь или квест');
        }
        return await questUserRep.findOneBy({user, quest})
        
     

    }

    public static async track(userId: number, questId: number): Promise<Quest_User[]> {
        const questRep = AppDataSource.getRepository(Quest);
        const userRep = AppDataSource.getRepository(User);
        const questUserRep = AppDataSource.getRepository(Quest_User);

        const author = await userRep.findOneBy({id:userId})
        const quest = await questRep.findOneBy({id:questId, author: author})
        if(!author || !quest) {
            throw new NotFoundError('Автор или квест автора');
        }
        return await questUserRep.findBy({quest})

    }

    public static async updateImagePath(id: number, path: string): Promise<Quest> {
        const questRep = AppDataSource.getRepository(Quest);
        // const userRep = AppDataSource.getRepository(User);
        // const questUserRep = AppDataSource.getRepository(Quest_User);

        const quest = await questRep.findOneBy({id:id})
        if(!quest) {
            throw new NotFoundError('Квест');
        }
        quest.image = path
        return await questRep.save(quest)

    }
    public static async getQuest( id: number): Promise<any> {
  
        return catchOrmErrors(async () => {
            
            const quest = await AppDataSource.getRepository(Quest).createQueryBuilder('quest')
            .leftJoinAndSelect("quest.stages", "stage")
            .where("quest.id = :id", {id: id})
            .leftJoinAndSelect("stage.stageAction", "stage_action")
            .leftJoinAndSelect("stage.stageTest", "stage_test")
            .leftJoinAndSelect("stage_test.questions", "question")
            // .leftJoinAndSelect("question.answer", "answer")
            // .leftJoinAndSelect("question.rightAnswer", "right_answer")
            .getOne()

            return quest
        });
    }
    public static async getQuests(): Promise<any> {
       return catchOrmErrors(async () => {

           const quests = await AppDataSource.getRepository(Quest).createQueryBuilder('quest')
           .leftJoinAndSelect("quest.stages", "stage")
           .leftJoinAndSelect("stage.stageAction", "stage_action")
           .leftJoinAndSelect("stage.stageTest", "stage_test")
           .leftJoinAndSelect("stage_test.questions", "question")
        //    .leftJoinAndSelect("question.answer", "answer")
        //    .leftJoinAndSelect("question.rightAnswer", "right_answer")
           .getMany()

           return quests
       });
   }
   public static async getCreatedQuests( id: number): Promise<any> {
  
    return catchOrmErrors(async () => {
            const quest = await AppDataSource.getRepository(Quest).createQueryBuilder('quest')
            .leftJoinAndSelect("quest.stages", "stage")
            .where("quest.authorId = :id", {id: id})
            .leftJoinAndSelect("stage.stageAction", "stage_action")
            .leftJoinAndSelect("stage.stageTest", "stage_test")
            .leftJoinAndSelect("stage_test.questions", "question")
            // .leftJoinAndSelect("question.answer", "answer")
            // .leftJoinAndSelect("question.rightAnswer", "right_answer")
            .getMany()

            return quest
        });

    }
    public static async getCreatedQuest( id: number): Promise<any> {
  
        return catchOrmErrors(async () => {
                const quest = await AppDataSource.getRepository(Quest_User).createQueryBuilder('questUser')
                .leftJoinAndSelect("questUser.user", "user")
                .where("questUser.questId = :id", {id: id})
                // .leftJoinAndSelect("question.answer", "answer")
                // .leftJoinAndSelect("question.rightAnswer", "right_answer")
                .getMany()
    
                return quest
            });
    
        }


    public static async deleteQuest(id: number): Promise<any> {
        const questRep = AppDataSource.getRepository(Quest);
        return await questRep.delete(id)

    }

    public static async getQR( word: string): Promise<string> {
        return new Promise((resolve,reject) => {
            QRCode.toDataURL(word, (err, src) => {
                if (err) {
                    return reject('Ошибка при создании qr кода')
                }
                return resolve(src)                        
            });
        }) 
    }
}


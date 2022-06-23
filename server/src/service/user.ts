import { User } from "../entity/User";
import { NotFoundError, AlreadyExistsError } from "../error";
import { catchOrmErrors } from "./utils";
import { AppDataSource } from "../data-source"



export class UserService {
    public static async add(name: string, password: string, surname: string, username: string): Promise<any> {
        const userRep = AppDataSource.getRepository(User);
        return catchOrmErrors(async () => {
            const oldUser = await userRep.findOneBy({username})
            if(oldUser) {
                throw new AlreadyExistsError();
            }
            const user = new User()
            user.name = name;
            user.surname = surname;
            user.password = password
            user.username = username
            return await userRep.save(user); 
        });
    }

    public static async getUser( username: string, password: string): Promise<any> {
        const userRep = AppDataSource.getRepository(User);
        return catchOrmErrors(async () => {
            return await userRep.findOneBy({ username, password })
        });
    }

    // public static async edit(id: string, data: { name?: string, born?: number, died?: number }): Promise<Author> {
    //     const rep = getManager().getRepository(Author);
    //     let author = await rep.findOne(id);
    //     if (!author) throw new NotFoundError('author');
    //     const { name, born, died } = data;
    //     author = {
    //         ...author,
    //         ...name && { name },
    //         ...born && { born },
    //         ...died && { died },
    //     }
    //     return await rep.save(author);
    // }

    public static async get(username: string): Promise<User> {
        const rep = AppDataSource.getRepository(User);
        return await rep.findOneBy({ username })
    }


    // public static async getPureSql(...ids: string[]): Promise<Author[]> {
    //     const rep = getManager().getRepository(Author);
    //     if (ids.length === 0)
    //         return await rep.query('select * from Author')
    //     return await rep.query('select * from Author where 1=0 or ' + ids.map(id => `"id"='${id}'`).join(' or '))
    // }
}
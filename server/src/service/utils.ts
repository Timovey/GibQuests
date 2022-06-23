import { QueryFailedError } from "typeorm";
import { AlreadyExistsError, UnexpectedDBError } from "../error";

export async function catchOrmErrors<T>(job: () => Promise<T>): Promise<T> {
    try {
        const result = await job();
        return result;
    } catch (e) {
        if (e instanceof QueryFailedError) {
            const code = (e as any).code as string;
            switch (code) {
                case '23505':
                    throw new AlreadyExistsError();
                default:
                    throw new UnexpectedDBError();
            }
        }
        throw e;
    }
}
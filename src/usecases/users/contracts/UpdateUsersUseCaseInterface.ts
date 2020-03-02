import { User } from "../../../entity/User";

export interface UpdateUsersUseCaseInterface {
    handle(id: number, user: User);
}

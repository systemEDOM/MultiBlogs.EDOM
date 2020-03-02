import { User } from "../../../entity/User";

export interface CreateUsersUseCaseInterface {
    handle(user: User);
}

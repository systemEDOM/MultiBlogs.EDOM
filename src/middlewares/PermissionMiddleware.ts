import TYPES from "../types";
import container from "../inversify.config";
import { AuthService } from "../services/AuthService/AuthService";
import { FindByIdUsersUseCaseInterface } from "../usecases/users/contracts/FindByIdUsersUseCaseInterface";

export default function permit(permission) {
    // return a middleware
    return async (request, response, next) => {
        let _authService = container.get<AuthService>(TYPES.AuthService);
        let _findUserByIdUseCase = container.get<FindByIdUsersUseCaseInterface>(TYPES.FindByIdUsersUseCaseInterface);


        let token = request.headers['authorization'];
        if (token) {
            token = token.replace('Bearer ', '');

            const user = _authService.getUser(token);

            let permissions = await _findUserByIdUseCase.handle(user.id).then( user => user.role.permissions);
            for (let key in permissions) {
                if (permission === permissions[key].name)
                    return next();
            }
            return response.status(401).json({message: "User unauthorized"});
        }
    }
  }
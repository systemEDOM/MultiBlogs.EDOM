import container from "../inversify.config";
import { AuthService } from "../services/AuthService/AuthService";
import TYPES from "../types";
import { FindByIdUsersUseCaseInterface } from "../usecases/users/contracts/FindByIdUsersUseCaseInterface";

export default function permit(permission) {
    // return a middleware
    return async (request, response, next) => {
        // tslint:disable-next-line:variable-name
        const _authService = container.get<AuthService>(TYPES.AuthService);
        // tslint:disable-next-line:variable-name
        const _findUserByIdUseCase = container.get<FindByIdUsersUseCaseInterface>(TYPES.FindByIdUsersUseCaseInterface);

        let token = request.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "");

            const user = _authService.getUser(token);

            // tslint:disable-next-line:no-shadowed-variable
            const permissions = await _findUserByIdUseCase.handle(user.id).then( (user) => user.role.permissions);
            for (const key in permissions) {
                if (permission === permissions[key].name) {
                    return next();
                }
            }
            return response.status(401).json({message: "User unauthorized"});
        }
    };
  }

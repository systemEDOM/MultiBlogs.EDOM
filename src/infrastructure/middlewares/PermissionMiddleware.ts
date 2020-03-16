import container from "../../inversify.config";
import { SignInUseCase } from "../../core/application/usecases/auth/Contracts/SignInUseCase";
import TYPES from "../../types";
import { FindByIdUserUseCase } from "../../core/application/usecases/users/Contracts/FindByIdUserUseCase";

export default function permit(permission) {
    // return a middleware
    return async (request, response, next) => {
        // tslint:disable-next-line:variable-name
        const _authService = container.get<SignInUseCase<any>>(TYPES.AuthService);
        // tslint:disable-next-line:variable-name
        const _findUserByIdUseCase = container.get<FindByIdUserUseCase<any>>(TYPES.FindByIdUsersUseCaseInterface);

        let token = request.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "");

            const user = _authService.getUser(token);

            // tslint:disable-next-line:no-shadowed-variable
            const permissions = await _findUserByIdUseCase.execute(1).then( (user) => user.role.permissions);
            for (const key in permissions) {
                if (permission === permissions[key].name) {
                    return next();
                }
            }
            return response.status(401).json({message: "User unauthorized"});
        }
    };
  }

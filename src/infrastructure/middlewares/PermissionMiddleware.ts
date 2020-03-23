import container from "../../inversify.config";
import TYPES from "../../types";
import { SignInUseCase } from "../../core/application/usecases/auth/SignInUseCase";
import { FindByIdUserUseCase } from "../../core/application/usecases/users/FindByIdUserUseCase";

export default function permit(permission) {
    return async (request, response, next) => {
        const authUseCase = container.get<SignInUseCase>(TYPES.SignInUseCase);
        const findUserByIdUseCase = container.get<FindByIdUserUseCase>(TYPES.FindByIdUserUseCase);

        let token = request.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "");

            const user = authUseCase.getUser(token);
            const idUser = (await user).id;
            const permissions = await findUserByIdUseCase.execute(idUser).then( userDTO => userDTO.role.permissions);
            for (const key of permissions) {
                if (permission === key.name) {
                    return next();
                }
            }
            return response.status(401).json({message: "User unauthorized"});
        }
    };
}

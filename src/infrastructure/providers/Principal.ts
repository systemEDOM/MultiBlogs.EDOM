import { interfaces } from "inversify-express-utils";

export class Principal implements interfaces.Principal {
    public details: any;

    public constructor(details: any) {
        this.details = details;
    }

    public isAuthenticated(): Promise<boolean> {
        return Promise.resolve(this.details !== null);
    }

    public isResourceOwner(resourceId: any): Promise<boolean> {
        let permissions = this.details.role.permissions;
        for (let key in permissions) {
            if (resourceId === permissions[key].name)
            return Promise.resolve(true)
        }
        return Promise.resolve(false);
    }

    public isInRole(role: string): Promise<boolean> {
        return Promise.resolve(role === "admin");
    }
}
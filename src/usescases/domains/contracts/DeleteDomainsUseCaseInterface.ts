import { Domain } from "../../../entity/Domain";

export interface DeleteDomainsUseCaseInterface {
    handle(id: number);
}
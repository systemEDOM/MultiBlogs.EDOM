import { Domain } from "../../../entity/Domain";

export interface UpdateDomainsUseCaseInterface {
    handle(id: number, domain: Domain);
}

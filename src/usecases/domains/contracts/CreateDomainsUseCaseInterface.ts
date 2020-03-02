import { Domain } from "../../../entity/Domain";

export interface CreateDomainsUseCaseInterface {
    handle(domain: Domain);
}

import "reflect-metadata";
import {createConnection} from "typeorm";
import {Domain} from "./entity/Domain";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const domain = new Domain();
    domain.name = "Timber";
    domain.url = "Saw";
    await connection.manager.save(domain);
    console.log("Saved a new domain with id: " + domain.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Domain);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));

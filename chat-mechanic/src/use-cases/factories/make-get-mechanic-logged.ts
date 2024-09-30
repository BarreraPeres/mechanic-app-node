import { MongodbMechanicRepository } from "../../repositories/mongobd/mongodb-mechanic-repository";
import { GetMechanicLoggedUseCase } from "../get-mechanic-logged.use-case";

export function MakeGetMechanicLogged() {
    const mechanicRepository = new MongodbMechanicRepository()
    const getMechanicLogged = new GetMechanicLoggedUseCase(mechanicRepository)
    return getMechanicLogged
}
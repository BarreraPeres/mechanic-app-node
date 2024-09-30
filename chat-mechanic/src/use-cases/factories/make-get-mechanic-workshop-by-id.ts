import { MongodbMechanicWorkshopRepository } from "../../repositories/mongobd/mongodb-mechanic-workshop-repository";
import { GetMechanicWorkshopById } from "../get-mechanic-workshop-by-id";

export function MakeGetMechanicWorkshopById() {
    const mechanicWorkshopRepository = new MongodbMechanicWorkshopRepository()
    const getMechanicWorkshopById = new GetMechanicWorkshopById(mechanicWorkshopRepository)
    return getMechanicWorkshopById

}
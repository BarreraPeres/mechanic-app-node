import { kafka } from ".";
import { MongodbMechanicRepository } from "../repositories/mongobd/mongodb-mechanic-repository";
import { MongodbMechanicWorkshopRepository } from "../repositories/mongobd/mongodb-mechanic-workshop-repository";
import { MongodbUserRepository } from "../repositories/mongobd/mongodb-user-repository";
import { CreateMechanicWorkshopUseCaseIntegration } from "../use-cases/create-mechanic-workshop.use-case";
import { RegisterMechanicUseCaseIntegration } from "../use-cases/register-mechanic.use-case";
import { RegisterUserUseCaseIntegration } from "../use-cases/register-user.use-case-integration";

export const consumer = kafka.consumer({
    groupId: "mechanic-group"
})
// add factories
const mongodbRepository = new MongodbUserRepository()
const registerUserUseCaseIntegration = new RegisterUserUseCaseIntegration(mongodbRepository)

const mongodbMechanicRepository = new MongodbMechanicRepository()
const registerMechanicUseCaseIntegration = new RegisterMechanicUseCaseIntegration(mongodbMechanicRepository)

const mongodbMechanicWorkshopRepository = new MongodbMechanicWorkshopRepository()
const createMechanicWorkshopUseCaseIntegration = new CreateMechanicWorkshopUseCaseIntegration(mongodbMechanicRepository, mongodbMechanicWorkshopRepository)

export async function start() {
    await consumer.connect()

    await consumer.subscribe({ topic: "login-user", fromBeginning: true })
    await consumer.subscribe({ topic: "login-mechanic", fromBeginning: true })
    await consumer.subscribe({ topic: "create-mechanic-workshop", fromBeginning: true })

    await consumer.run({
        async eachMessage({ message, topic }) {
            let payload = await JSON.parse(message.value!.toString())

            try {
                switch (topic) {
                    case "login-user":
                        await registerUserUseCaseIntegration.handle(payload)
                        console.log("User registered in mongoDB")
                        break
                    case "login-mechanic":
                        await registerMechanicUseCaseIntegration.handle(payload)
                        console.log(`Mechanic ${payload.name} registered in mongoDB`)
                        break
                    case "create-mechanic-workshop":
                        await createMechanicWorkshopUseCaseIntegration.handle(payload)
                        console.log(`workShop ${payload.name} registered by ${payload.id_mechanic_user} in mongoDB`)
                }
            } catch (e) {
                throw e
            }
        }
    })
}


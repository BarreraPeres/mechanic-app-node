import { IMechanic } from "../schemas/Mechanic";
import { RegisterMechanicUseCaseIntegrationRequest, RegisterMechanicUseCaseIntegrationResponse } from "../use-cases/register-mechanic.use-case";
import { RegisterUserUseCaseIntegrationResponse } from "../use-cases/register-user.use-case-integration";

type MechanicsUseCaseIntegrationResponse = {
    mechanics: IMechanic
}


export interface MechanicRepository {
    create(data: RegisterMechanicUseCaseIntegrationRequest): Promise<RegisterMechanicUseCaseIntegrationResponse>
    findByEmail(email: string): Promise<RegisterMechanicUseCaseIntegrationResponse | null>
    findByExternalId(mechanic_external_id: string): Promise<MechanicsUseCaseIntegrationResponse | null>
    findByTokenIdAndSave(token_id: string, socket_id: string): Promise<RegisterUserUseCaseIntegrationResponse | null>
    findById(_id: String): Promise<RegisterUserUseCaseIntegrationResponse | null>
}
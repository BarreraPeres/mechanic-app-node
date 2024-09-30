import { RegisterUserUseCaseIntegrationRequest, RegisterUserUseCaseIntegrationResponse } from "../use-cases/register-user.use-case-integration";

export interface UserRepository {
    create(data: RegisterUserUseCaseIntegrationRequest): Promise<RegisterUserUseCaseIntegrationResponse>
    findByTokenIdAndSave(token_id: string, socket_id: string): Promise<RegisterUserUseCaseIntegrationResponse | null>
    findByExternalId(external_id: string): Promise<RegisterUserUseCaseIntegrationResponse | null>
    findById(_id: String): Promise<RegisterUserUseCaseIntegrationResponse | null>
}

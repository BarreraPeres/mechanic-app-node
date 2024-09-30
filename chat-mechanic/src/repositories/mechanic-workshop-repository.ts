import { CreateMechanicWorkshopUseCaseIntegrationRequest, CreateMechanicWorkshopUseCaseIntegrationResponse } from "../use-cases/create-mechanic-workshop.use-case";

export interface MechanicWorkshopRepository {
    create(data: CreateMechanicWorkshopUseCaseIntegrationRequest): Promise<CreateMechanicWorkshopUseCaseIntegrationResponse>
    findByExtenalId(external_id: string): Promise<CreateMechanicWorkshopUseCaseIntegrationResponse | null>
}
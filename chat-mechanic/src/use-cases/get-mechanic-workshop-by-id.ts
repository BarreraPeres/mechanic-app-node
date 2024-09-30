import { MechanicWorkshopRepository } from "../repositories/mechanic-workshop-repository";

interface GetMechanicWorkshopByIdRequest {
    mechanic_id: string
}


export class GetMechanicWorkshopById {
    constructor(
        private mechanicWorkshop: MechanicWorkshopRepository
    ) { }
    async handle({ mechanic_id }: GetMechanicWorkshopByIdRequest): Promise<any> {

        const mechanicWorkshop = await this.mechanicWorkshop.findByExtenalId(
            mechanic_id
        )

        return {
            mechanicWorkshop
        }
    }
}

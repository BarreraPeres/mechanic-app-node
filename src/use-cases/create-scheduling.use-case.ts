import { parseISO } from "date-fns"
import { Scheduling } from "@prisma/client"
import { SchedulingRepository } from "../repositories/scheduling-repository"
import { ScheduledTimeExistsError } from "./errors/scheduled-time-exists-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { VehicleRepository } from "../repositories/vehicle-repository"
import { prisma } from "../config/prisma"
import { MechanicRepository } from "../repositories/mechanic-repository"


interface schedulingRequest {
    user_id: string
    scheduled_for: Date
    description: string
    vehicle_id: string
    mechanic_id: string
    type: 'MAINTENANCE' | 'REPAIR' | 'INSPECTION';
}

interface schedulingResponse {
    scheduling: Scheduling
}

export class CreateSchedulingUseCase {
    constructor(
        public schedulingRepository: SchedulingRepository,
        public vehicleRepository: VehicleRepository,
        public mechanicRepository: MechanicRepository
    ) { }
    async execute({
        user_id,
        scheduled_for,
        type,
        description,
        vehicle_id,
        mechanic_id,

    }: schedulingRequest): Promise<schedulingResponse> {

        const status = "SCHEDULED"

        const conflictingSchedule = await this.schedulingRepository.findConflictingSchedule(scheduled_for, status)
        if (conflictingSchedule) {
            throw new ScheduledTimeExistsError()
        }

        const vehicle = await this.vehicleRepository.findById(vehicle_id, user_id)
        if (!vehicle) {
            throw new ResourceNotFoundError()
        }


        const mechanic = await this.mechanicRepository.findById(mechanic_id)

        if (!mechanic) {
            throw new ResourceNotFoundError()
        }

        const scheduling = await this.schedulingRepository.create({
            scheduled_for,
            description,
            mechanic_id,
            user_id,
            vehicle_id,
            type,
            status: "PENDING"
        })

        return { scheduling }

    }
}
import { OrderService, Prisma, Vehicle } from "@prisma/client";


export type OrderServiceWithVehicle = {
    id: string;
    created_at: Date;
    status: string;
    description: string | null;
    materials: string | null;
    value: number;
    start_date: Date;
    end_date: Date;
    scheduling_id: string | null;
    mechanic_id: string | null;
    vehicle_id: string;
    vehicle: {
        user_id: string
        plate: string
        model: string
        brand: string
        year: number
    } | null
}

export interface OrderServiceCreateTypeWithVehicle extends Prisma.OrderServiceUncheckedCreateInput {
    vehicle?: Vehicle
}
export interface OrderServiceRepository {
    create(data: OrderServiceCreateTypeWithVehicle): Promise<OrderService>
    findByDate(startDate: Date, endDate: Date): Promise<OrderService[]>;
    findSchedulingExisting(scheduling_id: string): Promise<OrderService | null>
    save(schedulingId: string, UpdateStatus: string): Promise<OrderService | null>
    findManyByMechanicId(mechanicId: string, page: number, status?: string,): Promise<OrderServiceWithVehicle[] | null>
    findManyByVehicleId(vehicleId: string, page: number): Promise<OrderService[]>
}


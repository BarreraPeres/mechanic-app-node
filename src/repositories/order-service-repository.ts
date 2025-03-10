import { Mechanic, OrderService, Prisma, Vehicle } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type OrderServiceWithVehicleAndMechanic = {
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
    } | null;
    mechanic: {
        id: string
        name: string
        phone: string | null
        latitude: Decimal
        longitude: Decimal
    } | null
}

export interface OrderServiceCreateTypeWithVehicle extends Prisma.OrderServiceUncheckedCreateInput {
    vehicle?: Vehicle
    mechanic?: Mechanic
}
export interface OrderServiceRepository {
    create(data: OrderServiceCreateTypeWithVehicle): Promise<OrderService>
    findById(id: string): Promise<OrderServiceWithVehicleAndMechanic | null>
    findByDate(startDate: Date, endDate: Date): Promise<OrderService[]>;
    findSchedulingExisting(scheduling_id: string): Promise<OrderService | null>
    save(schedulingId: string, UpdateStatus: string): Promise<OrderService | null>
    findManyByMechanicId(mechanicId: string, page: number, status?: string,): Promise<OrderServiceWithVehicleAndMechanic[] | null>
    findManyByVehicleId(vehicleId: string, page: number): Promise<OrderService[]>
    getInvoicing(mechanicId: string): Promise<{ sum: number } | null>
}


import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../../config/prisma";
import dayjs from "dayjs";



export async function availableTimes(request: FastifyRequest, reply: FastifyReply) {
    const schemaParms = z.object({
        mechanicId: z.string().uuid()
    })

    const schemaQuery = z.object({
        query: z.coerce.string().nullish().optional()
    })
    //    app.get("/times/:mechanicId", availableTimes)
    const { mechanicId } = schemaParms.parse(request.params)
    const { query } = schemaQuery.parse(request.query)

    const mechanic = await prisma.mechanic.findUnique({
        where: {
            id: mechanicId
        },
        include: {
            order_services: true
        }
    });

    if (!mechanic) {
        throw new Error("message")
    }

    const allPossibleTimes = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30"
    ];

    const occupiedTimes = mechanic.order_services.flatMap(service => {
        let startTime = dayjs(service.start_date);
        const endTime = dayjs(service.end_date);
        const times = [];

        while (startTime.isBefore(endTime)) {
            times.push(startTime.format('HH:mm'));
            startTime = startTime.add(30, 'minute');
        }

        return times;
    });

    const availableTimes = allPossibleTimes.filter(time => !occupiedTimes.includes(time));
    console.log(occupiedTimes)
    return { availableTimes };

    //const durationInMinutes = dayjs(orders.order_services[0].end_date).diff(dayjs(orders.order_services[0].start_date), "minute")
    // const durationInMinutes = dayjs(orders.order_services[0].start_date).diff(dayjs(orders.order_services[0].end_date), "minute")
    // const durationInHour = dayjs(orders.order_services[0].start_date).diff(dayjs(orders.order_services[0].end_date), "hour")

    // const serviceTime: any[] = Array.from({ length: durationInMinutes / 30 }, (_, index) => {
    //     const date = dayjs(orders.order_services[0].start_date).add(index * 30, "minute").toDate()
    //     //const serviceTime - allPossibleTimes = availableTimesTimes
    //     return {
    //         serviceTime: date.toDateString(),
    //         description: orders.order_services.map(a => a.description),
    //     }
    // })
    // console.log(durationInMinutes, durationInHour)

    //return { serviceTime }
}
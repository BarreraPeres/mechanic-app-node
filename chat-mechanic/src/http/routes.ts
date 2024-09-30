import { FastifyInstance } from "fastify";
import { fetchRooms } from "./fetch";
import { getUserIdFromCookie } from "./get-user-id-from-cookie";
export async function routes(app: FastifyInstance) {

    app.get("/mechanic/chatRooms", fetchRooms)
    app.get("/get-id-token", getUserIdFromCookie)
}
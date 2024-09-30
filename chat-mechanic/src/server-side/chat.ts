import { io } from "../app";
import { MakeGetMechanicLogged } from "../use-cases/factories/make-get-mechanic-logged";
import { MakeGetMechanicWorkshopById } from "../use-cases/factories/make-get-mechanic-workshop-by-id";
import { MakeFetchMessagesAndNamesByRoomIdUseCase } from "../use-cases/factories/make-fetch-messages-and-names-by-room-id .use-case";
import { MakeFetchChatRoomsByIdUseCase } from "../use-cases/factories/make-fetch-chat-rooms-by-id.use-case";
import { MakeGetUserByIdUseCase } from "../use-cases/factories/make-get-user-by-id.use-case";
import { MakeCreateChatRoomUseCase } from "../use-cases/factories/make-create-chat-room.use-case";
import { MakeCreateMessageUseCase } from "../use-cases/factories/make-create-message.use-case";
import { MakeGetChatRoomByIdUseCase } from "../use-cases/factories/make-get-chat-room-by-id.use-case";
import { MakeGetUserFromTokenUseCase } from "../use-cases/factories/make-get-user-from-token.use-case";


io.on("connect", socket => {

    socket.on("login-user", async (data) => {
        const getUserFromTokenUseCase = MakeGetUserFromTokenUseCase()

        const user = await getUserFromTokenUseCase.handle({ token_id: data.token_id, role: data.role, socket_id: socket.id })
        socket.emit("user", user)
    })

    socket.on("start-conversation-with-mechanic", async (data, callback) => {
        const getMechanicLogged = MakeGetMechanicLogged()
        const getMechanicWorkshopById = MakeGetMechanicWorkshopById()
        const mechanics = await getMechanicLogged.handle({ mechanic_external_id: data.mechanic_employee_id })

        const createChatRoomUseCase = MakeCreateChatRoomUseCase()

        const { mechanicWorkshop } = await getMechanicWorkshopById.handle({ mechanic_id: data.mechanic_id })

        let chatRoom = await createChatRoomUseCase.handle
            ({
                id_mechanic_workshop: mechanicWorkshop.mechanicWorkshop._id,
                id_user: data.user_id,
                id_mechanic: mechanics.mechanic.mechanics._id
            })


        socket.join(chatRoom!.chatRoom.id_chat_room)

        callback({ mechanics, chatRoom, mechanicWorkshop })
    })

    socket.on("start-conversation-with-user", async (data, callback) => {
        socket.join(data.room_id)

        const getChatRoomByIdUseCase = MakeGetChatRoomByIdUseCase()

        const chatRoom = await getChatRoomByIdUseCase.handle({ chat_room_id: data.room_id, role: "CLIENT" })

        // socket.join(chatRoom.chatRoom._id)
        callback({ chatRoom })
    })

    socket.on("message", async (data) => {
        socket.join(data.chat_room_id)

        const createMessageUseCase = MakeCreateMessageUseCase()
        const getUserByIdUseCase = MakeGetUserByIdUseCase()
        const getChatRoomByIdUseCase = MakeGetChatRoomByIdUseCase()

        const { message } = await createMessageUseCase.handle({
            text: data.message,
            room_id: data.chat_room_id,
            to: data.id_logged,
            to_role: data.role
        })

        const user = await getUserByIdUseCase.handle({ _id: data.id_logged, role: data.role })

        io.to(data.chat_room_id).emit("message", { message, role: data.role, user })

        const { chatRoom } = await getChatRoomByIdUseCase.handle({ chat_room_id: String(data.chat_room_id), role: data.role !== "CLIENT" ? "CLIENT" : "BOSS" })


        console.log(chatRoom)
        console.log(chatRoom.id_chat_room)
        data.role === "CLIENT" ?
            io.to(chatRoom.id_mechanic.socket_id)
                .emit("notification", { id: chatRoom.id_user._id, role: data.role }) :
            io.to(chatRoom.id_user.socket_id)
                .emit("notification", { room_id: chatRoom.id_chat_room, role: data.role })
    })

    socket.on("open-chat", async (data, callback) => {
        socket.join(data.chat_room_id)
        const fetchMessagesAndNamesByIdUseCase = MakeFetchMessagesAndNamesByRoomIdUseCase()

        const { messages, user } = await fetchMessagesAndNamesByIdUseCase.handle({ room_id: data.chat_room_id, role: data.role })

        callback({ messages, user })
    })

    socket.on("get-rooms-of-user", async (data, callback) => {
        const fetchChatRoomsByIdUseCase = MakeFetchChatRoomsByIdUseCase()

        const { chatRooms } = await fetchChatRoomsByIdUseCase.handleUser({ id_user: data.user_id })

        callback({ chatRooms })
    })

})

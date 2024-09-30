
const socket = io("http://localhost:4000")
let chat_room_id = ""

async function onLoad() {
    // get users logged, mechanic or client
    const res = await axios.get("/get-id-token")
    const role = res.data.user.role
    const token_id = String(res.data.user.sub)
    socket.emit("login-user", { token_id, role })


    socket.on("user", (data) => {
        document.querySelector(".user_logged").innerHTML += `
        <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
    class="avatar_user_logged" user_id="${data.user._id}" role="${data.user.role}"  name="${data.user.name}"/>
    <strong id="user_logged">${data.user.name}</strong>
        <span> ${data.user.role}</span> 
        `

        const urlParms = new URLSearchParams(window.location.search)
        const mechanic_id = urlParms.get("id")
        const mechanic_employee_id = urlParms.get("mechanicEmployeeId")
        const room_id = urlParms.get("room_id")


        const user_id = data.user._id
        mechanic_employee_id !== null ?
            socket.emit("start-conversation-with-mechanic", { mechanic_employee_id, mechanic_id, user_id }, (data) => {
                const data_ = {
                    mechanic: data.mechanics.mechanic.mechanics,
                    mechanicWorkShop: data.mechanicWorkshop.mechanicWorkshop,
                    chat_room_id: data.chatRoom.chatRoom.id_chat_room
                }
                addMechanic(data_)
                chat_room_id = data.chatRoom.chatRoom.id_chat_room

                socket.emit("get-rooms-of-user", { user_id }, (datas) => {

                    datas.chatRooms.forEach((room) => {
                        const data = {
                            mechanic: room.id_mechanic,
                            mechanicWorkShop: room.id_mechanic_workshop,
                            chat_room_id: room.id_chat_room
                        }
                        if (chat_room_id !== room.id_chat_room) {
                            addMechanic(data)
                        }
                    })
                })


            }) : socket.emit("start-conversation-with-user", { room_id }, (data) => {
                chat_room_id = data.chatRoom.chatRoom.id_chat_room
                addUser(data.chatRoom.chatRoom)
            })
    })


    socket.on("message", (datas) => {
        data = {
            message: datas.message.message,
            user: datas.user.user.user,
            role: datas.role
            // message: datas.message.message,
            // names: datas.names,
            // role: datas.role
        }
        addMessage(data)
    })

    socket.on("notification", (data) => {

        if (data.role === "CLIENT") {
            const user = document.getElementById(`id_${data.id}`)
            user.insertAdjacentHTML("afterbegin", `<div class="notification"></div>`)
        } else {
            document
                .getElementById(`room_${data.room_id}`)
                .insertAdjacentHTML("afterbegin", `<div class="notification"></div>`)
        }
    })

}

function addMechanic(data) {

    const mechanicList = document.getElementById("users_list")
    mechanicList.innerHTML += `
    <li class="user_name_list" 
    name="${data.mechanic.name}" 
    id="room_${data.chat_room_id}"
    room_id="${data.chat_room_id}"
    mechanic_employee_id="${data.mechanic._id}">
       <img src="https://www.truro-penwith.ac.uk/app/uploads/2022/12/Basic-car-mechanics.jpg"
            class="nav_avatar" />
        <strong>${data.mechanic.name}</strong>
        <span>${data.mechanicWorkShop.name}</span>
    </li> 
    `
}

function addUser(user) {
    const userList = document.getElementById("users_list")
    userList.innerHTML += `
    <li class="user_name_list" 
    name="${user.id_user.name}"
    id="id_${user.id_user._id}"
    room_id="${user.id_chat_room}" >
       <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
            class="nav_avatar" />
        <strong>${user.id_user.name}</strong>
    </li> 
    `
}


document.getElementById("user_message").addEventListener("keypress", (event) => {
    const role = document.querySelector(".avatar_user_logged").getAttribute("role")
    const id_logged = document.querySelector(".avatar_user_logged").getAttribute("user_id")

    if (event.key === "Enter") {
        const message = event.target.value
        event.target.value = ""

        const data = {
            message, chat_room_id, role, id_logged
        }
        socket.emit("message", data)
    }
})

document.getElementById("users_list").addEventListener("click", (e) => {
    //const id_logged = document.querySelector(".avatar_user_logged").getAttribute("user_id")
    document.querySelectorAll("li.user_name_list")
        .forEach((item) => item.classList.remove("user_in_focus"))

    const messagesClear = document.getElementById("message_user")
    messagesClear.innerHTML = ""

    const role = document.querySelector(".avatar_user_logged").getAttribute("role")

    if (e.target && e.target.matches("li.user_name_list")) {
        const id_clicked = e.target.getAttribute("id")
        const id_room = e.target.getAttribute("room_id")
        chat_room_id = id_room

        e.target.classList.add("user_in_focus")
        const notification = document.querySelector(`#${id_clicked} .notification`)
        if (notification) {
            notification.remove()
        }

        socket.emit("open-chat", { chat_room_id, role }, (datas) => {
            //chat_room_id = datas.messages.messages.room_id
            datas.messages.forEach((messages) => {
                const data = {
                    message: messages,
                    user: datas.user,
                    role: datas.role
                }
                addMessage(data)
            })

        })

    }
})

function addMessage(data) {
    const messageUser = document.getElementById("message_user")
    messageUser.innerHTML += `
    <span class="user_name user_name_date" > 
        <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
        class="img_user" />
        <strong>${data.user.name}</strong>
        <span>${data.message.createdAt}</span>
    </span>
     <div class="messages">
     <span class="chat_message">${data.message.text}</span>
    </div>
    `

    messageUser.scrollTop = messageUser.scrollHeight
}
onLoad()
import mongoose from "mongoose";



export const mongoDbConnect = mongoose.createConnection("mongodb://root:docker123@localhost:27017/mongodb", {
    authSource: "admin"
})

mongoDbConnect.on("connected", () => {
    console.log("MongoDbChat is run 🚀")
})

// mongoDbConnect.set("debug", true)
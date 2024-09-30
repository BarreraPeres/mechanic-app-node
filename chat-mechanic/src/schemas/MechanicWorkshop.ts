import { Document, Schema } from "mongoose";
import { mongoDbConnect } from "../connection";


export interface IMechanicWorkshop extends Document {
    _id: String
    external_id: string,
    name: string,
    phone: string,
    latitude: number,
    longitude: number,
    mechanics: string[]
}


const MechanicWorkshopSchema = new Schema({
    external_id: String,
    name: String,
    phone: String,
    latitude: Number,
    longitude: Number,
    mechanics: [{
        type: String,
        ref: "mechanics"
    }]

},
    {
        timestamps: true
    })

const MechanicWorkshop = mongoDbConnect.model<IMechanicWorkshop>("mechanicWorkshops", MechanicWorkshopSchema)

export { MechanicWorkshop }
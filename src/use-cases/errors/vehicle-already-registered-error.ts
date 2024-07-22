export class VehicleAlreadyRegisteredError extends Error {
    constructor() {
        super("Vehicle Already Registered!")
    }
}
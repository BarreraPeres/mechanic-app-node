export class TimeNotAvailebleOrderServicesError extends Error {
    constructor() {
        super("Time slot is not available")
    }
}
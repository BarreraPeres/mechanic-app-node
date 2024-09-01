import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
    clientId: 'mechanic-api',
    brokers: ['localhost:9092'],
})

export {
    kafka
}
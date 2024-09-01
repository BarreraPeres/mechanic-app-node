import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'mechanic-chat',
    brokers: ['localhost:9092'],
})

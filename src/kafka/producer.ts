import { kafka } from ".";
import { env } from "../env";

export class KafkaProducer {
    async exec(topic: string, payload: any): Promise<void> {
        const producer = kafka.producer({
            allowAutoTopicCreation: true
        })

        try {
            await producer.connect()
            console.log(`SEND FOR ${topic}`)

            if (env.NODE_ENV === "dev") {
                console.log({ payload })
            }

            await producer.send({
                topic,
                messages: [
                    {
                        value: JSON.stringify(payload)
                    }
                ]
            })

            await producer.disconnect()
        } catch (e) {
            console.log(e)
        }
    }

}
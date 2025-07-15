import { Kafka, logLevel } from 'kafkajs';
import { UserDataLog } from './userDataLog';

const kafka = new Kafka({
  clientId: 'node-backend-app',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'analytics-group' });

export async function sendUserEvent(eventType: 'user.registered' | 'user.logged_in', payload: any) {
  await producer.send({
    topic: 'user-events',
    messages: [
      { value: JSON.stringify({ type: eventType, ...payload }) },
    ],
  });
}

export async function startUserEventConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());
      const { type, userId, timestamp } = event;
     
      if (!userId || !timestamp) return;
      if (type === 'user.registered') {
        // Create a new log entry for registration
        await UserDataLog.create({
          userId,
          registeredAt: timestamp,
        }).catch(() => {}); // Ignore duplicate key errors
      } else if (type === 'user.logged_in') {
        // Update lastLoginAt for the user
        await UserDataLog.findOneAndUpdate(
          { userId },
          { lastLoginAt: timestamp },
          { upsert: false }
        );
      }
    },
  });
} 
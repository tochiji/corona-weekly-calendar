export const helloPubSub = (message: Message, context: Context, callback: Callback) => {
  const name = message.data ? Buffer.from(message.data, 'base64').toString() : 'World';

  console.log(`Hello, ${name}!`);
  callback();
};

interface Message {
  data: string;
}

interface Context {
  eventId: string;
  timestamp: string;
  eventType: string;
  resource: unknown;
}

type Callback = () => void;

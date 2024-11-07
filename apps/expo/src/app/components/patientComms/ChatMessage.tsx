// ChatMessage.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useSubscribe } from 'replicache-react';
import { Replicache } from 'replicache';

// Initialize Replicache for messages
const rep = new Replicache({
  name: 'messages',
  licenseKey: 'your-license-key',
  mutators: {
    async createMessage(
      tx: WriteTransaction,
      {
        id,
        sender,
        time,
        content,
      }: { id: string; sender: string; time: string; content: string }
    ) {
      await tx.put(`message/${id}`, { sender, time, content });
    },
  },
  pushURL: `/api/replicache/push`,
  pullURL: `/api/replicache/pull`,
  logLevel: 'debug',
});

const ChatMessage = () => {
  // Subscribe to messages
  const messages =
    useSubscribe(
      rep,
      async (tx) => {
        const list = await tx.scan({ prefix: 'message/' }).entries().toArray();
        return list.map(([key, value]) => value);
      },
      [] // Default to an empty array
    ) || []; // Fallback to an empty array if undefined

  return (
    <View>
      {messages.map((message, index) => (
        <View
          key={index}
          className="bg-white p-4 my-2 mx-4 rounded-lg shadow-md"
        >
          <MessageHeader sender={message.sender} time={message.time} />
          <MessageBody content={message.content} />
        </View>
      ))}
    </View>
  );
};

const MessageHeader = ({ sender, time }) => (
  <View className="flex-row justify-between mb-2">
    <Text className="text-gray-700 font-semibold">{sender}</Text>
    <Text className="text-gray-500 text-sm">{time}</Text>
  </View>
);

const MessageBody = ({ content }) => (
  <View>
    <Text className="text-gray-800">{content}</Text>>
  </View>
);

export default ChatMessage;

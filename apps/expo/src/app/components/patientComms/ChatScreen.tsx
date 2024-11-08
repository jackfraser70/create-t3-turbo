import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSubscribe } from 'replicache-react';
import type { WriteTransaction } from 'replicache';
import { Replicache } from 'replicache';
import { nanoid } from 'nanoid';
import MessageInput from './MessageInput';
import { FlashList } from '@shopify/flash-list';
import ChartOne from '../chart/Chart';

// Initialize Replicache for messages
const rep = new Replicache({
  name: 'messages',
  licenseKey: 'l58cd3914a58441f1a01198726ca82729y',
  mutators: {
    async createMessage(
      tx: WriteTransaction,
      {
        id,
        patientId,
        sender,
        time,
        content,
      }: {
        id: string;
        patientId: string;
        sender: string;
        time: string;
        content: string;
      }
    ) {
      await tx.put(`message/${id}`, { patientId, sender, time, content });
    },
  },
  pushURL: `/api/replicache/push`,
  pullURL: `/api/replicache/pull`,
  logLevel: 'debug',
});

const seedMessages = async (patientId: string) => {
  const dummyMessages = [
    {
      id: nanoid(),
      patientId,
      sender: 'Alice',
      time: '10:00 AM',
      content: 'Hello!',
    },
    {
      id: nanoid(),
      patientId,
      sender: 'Bob',
      time: '10:05 AM',
      content: 'Hi there!',
    },
    {
      id: nanoid(),
      patientId,
      sender: 'John',
      time: '10:10 AM',
      content: 'How are you?',
    },
  ];

  for (const message of dummyMessages) {
    await rep.mutate.createMessage(message);
  }
};

const ChatMessage = () => {
  const patientId = '1';

  // Subscribe to messages filtered by patientId
  const messages =
    useSubscribe(
      rep,
      async (tx) => {
        const list = await tx.scan({ prefix: 'message/' }).entries().toArray();
        return list
          .map(([key, value]) => value)
          .filter((message) => message.patientId === patientId);
      },
      [] // Default to an empty array
    ) || []; // Fallback to an empty array if undefined

  useEffect(() => {
    if (messages.length === 0) {
      seedMessages(patientId);
    }
  }, [messages, patientId]);

  return (
    <View style={{ flex: 1, maxHeight: '300' }}>
      <ChartOne />
      <FlashList
        data={messages}
        style={{ flex: 1, borderWidth: 3, borderColor: 'blue' }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              marginVertical: 8,
              marginHorizontal: 16,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
          >
            <MessageHeader sender={item.sender} time={item.time} />
            <MessageBody content={item.content} />
          </View>
        )}
        estimatedItemSize={300} // Adjust this value based on your item size
        // keyExtractor={(item) => item.id}
      />
      <MessageInput onSend={(texts) => console.log(texts)} />
    </View>
  );
};

const MessageHeader = ({ sender, time }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    }}
  >
    <Text style={{ color: '#4a4a4a', fontWeight: '600' }}>{sender}</Text>
    <Text style={{ color: '#9e9e9e', fontSize: 12 }}>{time}</Text>
  </View>
);

const MessageBody = ({ content }) => (
  <View>
    <Text style={{ color: '#333333' }}>{content}</Text>
  </View>
);

export default ChatMessage;

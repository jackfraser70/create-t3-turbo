import React from 'react';
import { View, Text } from 'react-native';

const TimeBadge = ({ time, duration }) => {
  return (
    <View className="flex-row items-center">
      <Text className="text-pink-600 font-bold">{time}</Text>
      <Text className="text-pink-600 ml-2">{duration}</Text>
    </View>
  );
};

export default TimeBadge;

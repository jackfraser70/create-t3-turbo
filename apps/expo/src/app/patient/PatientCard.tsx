import React from 'react';
import { View, Text, Image } from 'react-native';

import TimeBadge from '../components/appointments/TimeBadge';

const AppointmentCard = ({
  name,
  age,
  frequency,
  time,
  duration,
  examType,
  doctor,
  imageUrl,
}) => {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <View className="flex-row items-center mb-2">
        <View className="bg-pink-200 rounded-full w-10 h-10 justify-center items-center mr-3">
          <Text className="text-pink-600 font-bold">{name[0]}</Text>
        </View>
        <Text className="text-lg font-bold">{name}</Text>
      </View>
      <Text className="text-gray-500 mb-2">
        {age} years old {frequency}
      </Text>
      <View className="bg-pink-100 rounded-lg p-2 flex-row items-center mb-2">
        <Image
          source={{ uri: imageUrl }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <TimeBadge time={time} duration={duration} />
          <Text className="text-pink-600 font-bold">
            {examType} with {doctor}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="text-pink-600 font-bold mr-2">Messages</Text>
        <Text className="text-gray-500">3 hours ago</Text>
      </View>
    </View>
  );
};

export default AppointmentCard;

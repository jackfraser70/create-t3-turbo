import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { WriteTransaction } from 'replicache';
import { Replicache } from 'replicache';
import { useSubscribe } from 'replicache-react';
import { nanoid } from 'nanoid';
import AppointmentCard from './AppointmentCard';
import { AppContext } from '~/app/contexts/AppContext';

const rep = new Replicache({
  name: 'appointments',
  licenseKey: 'l58cd3914a58441f1a01198726ca82729',
  mutators: {
    async createAppointment(
      tx: WriteTransaction,
      { id, time, name }: { id: string; time: string; name: string }
    ) {
      await tx.put(`appointment/${id}`, { time, name });
    },
  },
  pushURL: `/api/replicache/push`,
  pullURL: `/api/replicache/pull`,
  logLevel: 'debug',
});

const seedData = async () => {
  const dummyAppointments = [
    { id: nanoid(), time: '10am', name: 'Tom Clean2' },
    { id: nanoid(), time: '10am', name: 'Michael Mouthwash' },
    { id: nanoid(), time: '11am', name: 'Molly Molar' },
    { id: nanoid(), time: '11am', name: 'Peter Pulp' },
  ];

  for (const appointment of dummyAppointments) {
    await rep.mutate.createAppointment(appointment);
  }
};

const AppointmentList = ({ selectedAppointment, setSelectedAppointment }) => {
  const { state, setState } = useContext(AppContext);

  const appointments =
    useSubscribe(
      rep,
      async (tx) => {
        const list = await tx
          .scan({ prefix: 'appointment/' })
          .entries()
          .toArray();
        return list.map(([key, value]) => value);
      },
      [] // Ensure the default value is an empty array
    ) || []; // Fallback to an empty array if undefined

  useEffect(() => {
    seedData();

    const intervalId = setInterval(async () => {
      const newId = nanoid();
      await rep.mutate.createAppointment({
        id: newId,
        time: '12pm',
        name: `New Appointment ${newId}`,
      });
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const groupedAppointments = (appointments || []).reduce(
    (acc, { time, name }) => {
      if (!acc[time]) acc[time] = { title: time, data: [] };
      acc[time].data.push(name);
      return acc;
    },
    {} as Record<string, { title: string; data: string[] }>
  );

  return (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>Today</Text>
      <FlashList
        data={Object.values(groupedAppointments)}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.title}</Text>
            </View>
            {item.data.map((name, idx) => (
              <AppointmentCard
                key={idx}
                name={name}
                onPress={() => setSelectedAppointment(name)}
                isSelected={selectedAppointment === name}
              />
            ))}
          </View>
        )}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: '25%',
    padding: 10,
    flex: 1,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#F8D7E4',
    padding: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppointmentList;

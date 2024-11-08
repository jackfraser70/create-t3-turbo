import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppointmentList from '../components/appointments/AppointmentList';
import ChatScreen from '../components/patientComms/ChatScreen';

export default function MainContent() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <View style={styles.mainContent}>
      <AppointmentList
        selectedAppointment={selectedAppointment}
        setSelectedAppointment={setSelectedAppointment}
      />
      {selectedAppointment ? (
        <ChatScreen />
      ) : (
        <Text style={styles.placeholderText}>Select an appointment</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    padding: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});

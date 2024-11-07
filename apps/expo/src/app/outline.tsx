import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppointmentList from './components/appointments/AppointmentList';
import ChatScreen from './components/patientComms/ChatScreen';

export default function App() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <AppointmentList
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
        />
        <View style={styles.mainContent}>
          {selectedAppointment ? (
            <>
              <View style={styles.header}>
                <Text style={styles.headerText}>{selectedAppointment}</Text>
                <Text style={styles.subHeaderText}>
                  Details for {selectedAppointment}
                </Text>
                <ChatScreen />
              </View>
              <View style={styles.details}>
                <Text style={styles.detailsText}>10am 15 mins</Text>
                <Text style={styles.detailsText}>Regular exam with John</Text>
              </View>
            </>
          ) : (
            <Text style={styles.placeholderText}>Select an appointment</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, // Ensure the root view takes up the full screen
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FDEFF4',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#777',
  },
  details: {
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
  },
  placeholderText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
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

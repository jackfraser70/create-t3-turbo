import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import withErrorBoundary from '../../utils/errorHandling/ErrorBoundaryHOC';

const ChartOne = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const handlePress = (index: number) => {
    setSelected(index);
  };

  const diagnosticItems = [
    'Bitewing X Ray',
    'Transillumination',
    'Intraoral camera',
    'Diagnodent',
    'Dye',
    'Panoramic X Ray',
    'Cephalometric X Ray',
    'Cone Beam CT',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {Array.from({ length: 12 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.rectangle,
              index === 3 ? styles.highlightedRectangle : null,
              selected === index ? styles.selectedRectangle : null,
            ]}
            onPress={() => handlePress(index)}
          >
            {index === 3 && (
              <>
                <Text style={styles.textWhite}>UL5</Text>
                <Text style={styles.textWhite}>MOD</Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.title}>UL5 MOD</Text>
        <Text style={styles.subtitle}>Surfaces</Text>
        <View style={styles.row}>
          {['Caries, level 6', 'Plaque', 'Erosion, level 1'].map(
            (text, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  index === 0 ? styles.highlightedTag : null,
                  selected === index + 12 ? styles.selectedTag : null,
                ]}
                onPress={() => handlePress(index + 12)}
              >
                <Text style={styles.textWhite}>{text}</Text>
                <Text style={styles.textWhite}>X</Text>
              </TouchableOpacity>
            )
          )}
          <TouchableOpacity
            style={styles.circle}
            onPress={() => handlePress(null)}
          >
            <Text style={styles.textWhite}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Diagnostic</Text>
        <FlashList
          data={diagnosticItems}
          renderItem={({ item }) => (
            <View style={styles.infoBox}>
              <Text style={styles.textBlack}>{item}</Text>
              <Text style={styles.textBlack}>Included in plan</Text>
            </View>
          )}
          estimatedItemSize={50}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Treatment</Text>
        <View style={styles.row}>
          {['Composite filling', 'Cerec crown', 'Endodontal referral'].map(
            (text, index) => (
              <View key={index} style={styles.infoBox}>
                <Text style={styles.textBlack}>{text}</Text>
                <Text style={styles.textBlack}>
                  £{index === 0 ? '345' : index === 1 ? '543' : '600-£1000'}
                </Text>
              </View>
            )
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rectangle: {
    width: 100,
    height: 150,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedRectangle: {
    backgroundColor: '#E351B9',
  },
  selectedRectangle: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  textWhite: {
    color: '#FFF',
  },
  textBlack: {
    color: '#000',
  },
  bottomSection: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#A8A8A8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightedTag: {
    backgroundColor: '#CC2E97',
  },
  selectedTag: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  infoBox: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
  },
});

const CustomFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'red', fontSize: 20 }}>Chart failed to load</Text>
  </View>
);

export default withErrorBoundary(ChartOne, <CustomFallback />);

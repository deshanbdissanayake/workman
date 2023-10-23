import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../assets/colors/colors';

const Select = ({ data = [], selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        accessibilityLabel="Select an option"
      >
        <Picker.Item key={0} label={'Select'} value={null} />
        {data !== null && data.length !== 0 ? (
          data.map(item => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))
        ) : null}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  picker: {
    fontFamily: 'ms-bold',
  },
});

export default Select;

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from "@rneui/base";

export default function ListStudents(props) {
  const { name, lastname, surname, onPress, curp, matricula } = props;
  const fullName = `${name} ${lastname} ${surname}`;
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('StudentSettings', { userData: { name, lastname, surname, curp, matricula } });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.listUsers}>
      <Text style={styles.title}>{fullName}</Text>
      <Icon
        name="account-edit-outline"
        type="material-community"
        color="#4480FF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listUsers: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 10,
    marginTop: 6,
  },
});

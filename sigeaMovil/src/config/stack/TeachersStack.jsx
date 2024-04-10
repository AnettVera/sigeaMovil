import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Teachers from '../../modules/admin/Teachers/adapters/screens/Teachers';
import TeachersSettings from './../../modules/admin/Teachers/adapters/screens/TeachersSettings'; // Asegúrate de proporcionar la ruta correcta

const Stack = createStackNavigator();
nombre="Jose Alberto";
export default function TeachersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4480FF',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen
        name='Teachers'
        component={Teachers}
        options={{ title: 'Docentes' }}
      />
      <Stack.Screen
        name='TeachersSettings'
        component={TeachersSettings}
        options={{ title: "Jose Alberto"}} 
      />
    </Stack.Navigator>
  );
}

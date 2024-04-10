import { StyleSheet } from 'react-native';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from '../../modules/admin/Settings/adapters/screens/Settings'

const Stack = createStackNavigator();

export default function SettingsStack() {
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
        name='Settings'
        component={Settings}
        options={{ title: 'Ajustes' }}
      />
    </Stack.Navigator>
  )
}


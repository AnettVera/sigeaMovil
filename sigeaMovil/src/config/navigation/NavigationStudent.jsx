import { StyleSheet } from 'react-native';
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ExamStack from '../stackStudents/ExamStack';
import HistoryStack from '../stackStudents/HistoyStack';
import { Ionicons } from '@expo/vector-icons';
import PerfilStack from '../stackStudents/PerfilStack';


const Drawer = createDrawerNavigator();

export default function Navigation() {



  return (

      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#f2f2f2',
            width: 250
          },
          headerStyle: {
            backgroundColor: '#4480FF'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          drawerActiveTintColor: '#6B82B8',
          drawerLabelStyle: {
            color: '#6B82B8'
          }
        }}
      >
      <Drawer.Screen
          name='ExamStack'
          component={ExamStack}
          options={{
            drawerLabel: 'Examenes',
            title: 'Examenes',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'reader' : 'reader-outline'}
                size={size}
                color='#4480FF'
              />
            ),
          }}
        />
        <Drawer.Screen
          name='HistoryStack'
          component={HistoryStack}
          options={{
            drawerLabel: 'Historial',
            title: 'Historial',
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? 'documents' : 'documents-outline'}
                size={size}
                color='#4480FF'
              />
            ),
          }}
        />
        <Drawer.Screen
        name="Mi Perfil"
        component={PerfilStack}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color='#4480FF'
            />
          ),
        }}
      />
      </Drawer.Navigator>
  )
}



  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#F9F9F9', // Color de fondo del BottomTabNavigator
    },
  });

import { StyleSheet } from 'react-native';
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TeachersStack from '../stack/TeachersStack'
import StudentsStack from '../stack/StudentsStack'
import SettingsStack from '../stack/SettingsStack'
import {Icon} from '@rneui/base'

const Tab= createBottomTabNavigator();

export default function Navigation() {
  return (

        <Tab.Navigator
         screenOptions={({route})=>({
            tabBarIcon:({focused, color, size})=>{
                const {iconName, iconType}= getIconName(route.name, focused)
                return(
                    <Icon name={iconName} type={iconType} size={size} color={color}/>
                );
            },
            tabBarActiveTintColor:'#6B82B8',
            tabBarInactiveTintColor:'#6B82B8',
            headerShown:false,
            tabBarStyle: styles.tabBar,
         })}
        >
            <Tab.Screen
                name='SettingsStack'
                component={SettingsStack}
                options={{title:'Ajustes'}}
            />
            <Tab.Screen
                name='TeachersStack'
                component={TeachersStack}
                options={{title:'Docentes'}}
            />
            <Tab.Screen
                name='StudentsStack'
                component={StudentsStack}
                options={{title:'Estudiantes'}}
            />

        </Tab.Navigator>

  )
}


const getIconName = (routeName, focused) => {
    let iconName = "";
    let iconType = "ionicon";
    switch (routeName) {
      case "SettingsStack":
        iconName = focused ? "settings" : "settings-outline";
        break;
      case "TeachersStack":
        iconName = focused ? "people" : "people-outline";
        break;
      case "StudentsStack":
        iconName = focused ? "school" : "school-outline";
        break;
    }
    return { iconName, iconType };
  };


  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#F9F9F9', // Color de fondo del BottomTabNavigator
    },
  });

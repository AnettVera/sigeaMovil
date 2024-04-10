// PerfilStack.jsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../../modules/students/adapters/screens/Perfil'

const Stack = createStackNavigator();

const PerfilStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Perfil'
        component={Perfil}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default PerfilStack;

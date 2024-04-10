// ExamStack.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamHistory from '../../modules/students/adapters/screens/ExamHistory'
import Results from '../../modules/students/adapters/screens/Results'

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name='ExamHistory'
        component={ExamHistory}
        options={{headerShown:false}}
      />
       <Stack.Screen
        name='Results'
        component={Results}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;

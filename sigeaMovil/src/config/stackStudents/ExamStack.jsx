// ExamStack.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Exam from '../../modules/students/adapters/screens/Exam';
import ExamsAccess from '../../modules/students/adapters/screens/ExamsAccess';

const Stack = createStackNavigator();

const ExamStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='ExamsAccess'
        component={ExamsAccess}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='Exam'
        component={Exam}
        options={{headerShown:false}}
      />
       
    </Stack.Navigator>
  );
};

export default ExamStack;

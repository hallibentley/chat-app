import React from "react";

import Start from "./components/Start";
import Chat from "./components/Chat";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CustomActions from "./components/CustomActions";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}









// import React, { Component } from 'react';

// import Start from './components/Start';
// import Chat from './components/Chat';

// import 'react-native-gesture-handler';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Start"
//         >
//           <Stack.Screen
//             name="Start"
//             component={Start}
//           />
//           <Stack.Screen
//             name="Chat"
//             component={Chat}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }




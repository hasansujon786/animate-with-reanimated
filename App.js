import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/Home'
import BasicScreen from './screens/Basic'
import PanGestureScreen from './screens/PanGesture'
import InterpolateScrollViewScreen from './screens/InterpolateScrollView'


const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator >
        <Drawer.Screen name='InterpolateScrollView' component={InterpolateScrollViewScreen} />
        <Drawer.Screen name='PanGesture' component={PanGestureScreen} />
        <Drawer.Screen name='Basic' component={BasicScreen} />
        <Drawer.Screen name='Home' component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

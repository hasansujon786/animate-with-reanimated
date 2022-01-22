import React from 'react'
import { StatusBar } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/Home'
import BasicScreen from './screens/Basic'
import PanGestureScreen from './screens/PanGesture'
import InterpolateScrollViewScreen from './screens/InterpolateScrollView'
import InterpolateColorScreen from './screens/InterpolateColor'
import PinchGestureScreen from './screens/PinchGesture'
import DbTapScreen from './screens/DbTap.js'
import ColorPickerScreen from './screens/ColorPicker'
import CircularProgressBarScreen from './screens/CircularProgressBar'
import AnimatedHeader from './screens/AnimatedHeader'
import AnimatedHeader2 from './screens/AnimatedHeader2'
import SwipeToDelete from './screens/SwipeToDelete'
import ImageSliderZara from './screens/ImageSliderZara'
import ImageSlider from './screens/ImageSlider'
import LayoutAnimation from './screens/LayoutAnimation'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Drawer.Navigator >
          <Drawer.Screen name='Home' component={HomeScreen} />
          <Drawer.Screen name='LayoutAnimation' component={LayoutAnimation} />
          <Drawer.Screen name='ImageSlider' component={ImageSlider} />
          <Drawer.Screen name='ImageSliderZara' component={ImageSliderZara} />
          <Drawer.Screen name='SwipeToDelete' component={SwipeToDelete} />
          <Drawer.Screen name='AnimatedHeader' component={AnimatedHeader} />
          <Drawer.Screen name='AnimatedHeader2' component={AnimatedHeader2} />
          <Drawer.Screen name='CircularProgressBar' component={CircularProgressBarScreen} />
          <Drawer.Screen name='ColorPicker' component={ColorPickerScreen} />
          <Drawer.Screen name='InterpolateScrollView' component={InterpolateScrollViewScreen} />
          <Drawer.Screen name='DbTap' component={DbTapScreen} />
          <Drawer.Screen name='PinchGesture' component={PinchGestureScreen} />
          <Drawer.Screen name='InterpolateColor' component={InterpolateColorScreen} />
          <Drawer.Screen name='PanGesture' component={PanGestureScreen} />
          <Drawer.Screen name='Basic' component={BasicScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  )
}

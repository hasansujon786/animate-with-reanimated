import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated'
const imageUri =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image)

const PinchGesture = () => {
  return (
    <View style={styles.screen}>
      <PinchGestureHandler >
        <AnimatedImage style={styles.image} source={{uri: imageUri}}/>
      </PinchGestureHandler>
    </View>
  )
}

export default PinchGesture

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    flex: 1 
  }
})

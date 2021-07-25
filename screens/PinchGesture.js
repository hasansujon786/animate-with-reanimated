import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const imageUri =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const { width, height } = Dimensions.get('window')
const AnimatedImage = Animated.createAnimatedComponent(Image)

const PinchGesture = () => {
  const focalX = useSharedValue(0)
  const focalY = useSharedValue(0)
  const scale = useSharedValue(1)
  const rPointerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
      ]
    }
  })
  const rImageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value }, // TODO: figure out how transform really works
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ]
    }
  })

  const handlePinchGesture = useAnimatedGestureHandler({
    onActive(event) {
      // active Object {
      //   "eventName": "157onGestureHandlerEvent",
      //   "focalX": 221.24969482421875,
      //   "focalY": 446.89990234375,
      //   "handlerTag": 4,
      //   "numberOfPointers": 2,
      //   "scale": 1.6686075097425825,
      //   "state": 4,
      //   "velocity": 0.0007547024070185815,
      // }
      scale.value = event.scale
      focalX.value = event.focalX
      focalY.value = event.focalY
    },
    onEnd() {
      scale.value = withTiming(1)
    }
  })
  return (
    <View style={styles.screen}>
      <PinchGestureHandler onGestureEvent={handlePinchGesture} >
        <Animated.View style={{ flex: 1 }}>
          <Animated.View style={[styles.pointer, rPointerStyles]} />
          <AnimatedImage style={[styles.image, rImageStyles]} source={{ uri: imageUri }} />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  )
}

export default PinchGesture

const POINTER_SIZE = 30

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    width,
    height,
  },
  pointer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    width: POINTER_SIZE,
    height: POINTER_SIZE,
    borderRadius: POINTER_SIZE / 2,
    backgroundColor: 'blue'
  }
})

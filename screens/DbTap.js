import React, { useRef } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'

const imageUri =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image)

const PinchGesture = () => {
  const dbTapRef = useRef()
  const heartScale = useSharedValue(0)
  const textOpacity = useSharedValue(1)

  const rHeartStyles = useAnimatedStyle(() => {
    return { transform: [{ scale: Math.max(heartScale.value, 0) }] }
  })
  const rTextStyles = useAnimatedStyle(() => {
    return { opacity: textOpacity.value }
  })
  return (
    <View style={styles.screen}>
      <TapGestureHandler
        waitFor={dbTapRef}
        onActivated={() => {
          textOpacity.value = withTiming(0, undefined, (isFinised) => {
            if (isFinised) {
              textOpacity.value = withDelay(280, withTiming(1))
            }
          })
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={dbTapRef}
          numberOfTaps={2}
          onActivated={() => {
            heartScale.value = withSpring(1, undefined, (isFinesed) => {
              if (isFinesed) {
                heartScale.value = withDelay(500, withSpring(0))
              }
            })
          }}
        >
          <Animated.View>
            <ImageBackground style={styles.image} source={{ uri: imageUri }}>
              <AnimatedImage resizeMode='center' style={[styles.heart,rHeartStyles]} source={require('../assets/heart.png')} />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
      <Animated.Text style={[styles.text, rTextStyles]}>Doubel Tap</Animated.Text>
    </View>
  )
}

export default PinchGesture

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: 100,
    height: 100,
    // width: width,
    // height: width,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
  },
  text: {
    fontSize: 22,
    marginTop: 16,
  }
})

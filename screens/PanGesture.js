import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
const BOX_SIZE = 60
const CIRCLE_SIZE = 300

export default function PanGesture() {
  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx) {
      // ctx act just like a varilale here
      ctx.startX = x.value
      ctx.startY = y.value
    },
    onActive(event, ctx) {
      x.value = ctx.startX + event.translationX
      y.value = ctx.startY + event.translationY
    },
    onEnd: () => {
      const boxMovied = Math.sqrt(x.value ** 2 + y.value ** 2)
      console.log(boxMovied)
      if ((boxMovied - BOX_SIZE / 2)  > CIRCLE_SIZE / 2) {
        x.value = withSpring(0)
        y.value = withSpring(0)
      }
    },
  })

  const aStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, {translateX: x.value}]
  }))

  return (
    <View style={styles.container}>
     <View style={styles.circle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, aStyles]} />
      </PanGestureHandler>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    borderWidth: 2,
    borderColor: 'royalblue',
    borderRadius: CIRCLE_SIZE / 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },

  box: {
    backgroundColor: 'royalblue',
    borderRadius: BOX_SIZE / 2,
    width: BOX_SIZE,
    height: BOX_SIZE,
  }
})

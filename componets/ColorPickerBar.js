import React, { useCallback } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

const ColorPickerBar = ({ colors, onColorChange }) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const adjustedPickerX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), BAR_WIDTH - PICKER_SIZE)
  })

  const rPickerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedPickerX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    }
  })
  const rPickerballStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, idx) => idx / colors.length * BAR_WIDTH)

    const backgroundColor = interpolateColor(
      adjustedPickerX.value,
      inputRange,
      colors)

    onColorChange?.(backgroundColor)

    return { backgroundColor }
  })


  const onEndGestureEvent = useCallback(() => {
    'worklet';
    translateY.value = withSpring(0)
    scale.value = withSpring(1)
  }, [])

  const handleTapGesture = useAnimatedGestureHandler({
    onStart(event) {
      translateX.value = withSpring(event.absoluteX - PICKER_SIZE)
      translateY.value = withSpring(-PICKER_SIZE)
      scale.value = withSpring(1.1)
    },
    onEnd: onEndGestureEvent
  })

  const handlePanGesture = useAnimatedGestureHandler({
    onStart(_, ctx) {
      ctx.x = adjustedPickerX.value
    },
    onActive(event, ctx) {
      translateX.value = event.translationX + ctx.x;
    },
    onEnd: onEndGestureEvent
  })


  return (
    <TapGestureHandler onGestureEvent={handleTapGesture}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={handlePanGesture}>
          <Animated.View>
            <LinearGradient style={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bar} colors={colors} >
              <Animated.View style={[styles.picker, rPickerStyle]}>
                <Animated.View style={[styles.pickerball, rPickerballStyle]} />
              </Animated.View>
            </LinearGradient>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}

export default ColorPickerBar

const { width } = Dimensions.get('window')
const BAR_WIDTH = width * 0.9
const BAR_HEIGHT = 40
const PICKER_SIZE = BAR_HEIGHT

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'red',
    height: BAR_HEIGHT,
    width: BAR_WIDTH,
    borderRadius: BAR_HEIGHT / 2,
  },
  picker: {
    position: 'absolute',
    backgroundColor: 'white',
    height: PICKER_SIZE,
    width: PICKER_SIZE,
    borderRadius: PICKER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerball: {
    borderBottomColor: 'rgba(0,0,0,0.8)',
    borderWidth: 1,
    backgroundColor: 'red',
    height: PICKER_SIZE / 1.5,
    width: PICKER_SIZE / 1.5,
    borderRadius: PICKER_SIZE / 1.5,
  },
})

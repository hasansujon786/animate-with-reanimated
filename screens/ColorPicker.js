import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPickerBar from '../componets/ColorPickerBar'

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];
const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const ColorPicker = () => {
  const pickedColor = useSharedValue(COLORS[0])

  const handleOncolorChange = useCallback((color) => {
    'worklet';
    pickedColor.value = color
  }, [])

  const rCircleStylse = useAnimatedStyle(() => {
    return { backgroundColor: pickedColor.value }
  })

  return (
    <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <View style={styles.top}>
        <Animated.View style={[styles.circle, rCircleStylse]} />
      </View>
      <View style={styles.bottom}>
        <ColorPickerBar onColorChange={handleOncolorChange} colors={COLORS} />
      </View>
    </View>
  )
}

export default ColorPicker

const styles = StyleSheet.create({
  top: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'red',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

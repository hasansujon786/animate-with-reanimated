import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Rect } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

// const { width, height } = Dimensions.get('window')

const CIRCLE_SIZE = 300
const CIRCLE_STROKE = 5
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CircularProgressBar = () => {
  const progress = useSharedValue(0)
  const rProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCLE_SIZE * (1 - progress.value)
    }
  })

  useEffect(() => {
    progress.value = 1 
  },[])

  return (
    <View style={styles.container} >
      <Svg height={CIRCLE_SIZE} width={CIRCLE_SIZE} viewBox="0 0 100 100">
        <Circle
          cx='50'
          cy='50'
          r={50 - CIRCLE_STROKE / 2}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={CIRCLE_STROKE}
          fill='none'
        />
        <AnimatedCircle
          cx='50'
          cy='50'
          r={50 - CIRCLE_STROKE / 2}
          stroke={STROKE_COLOR}
          strokeWidth={CIRCLE_STROKE}
          fill='none'
          strokeDasharray={CIRCLE_SIZE}
          animatedProps={rProps}
        />
      </Svg>
    </View>
  )
}

export default CircularProgressBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


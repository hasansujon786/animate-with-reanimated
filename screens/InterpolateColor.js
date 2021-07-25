import React, { useState } from 'react'
import { Switch, StyleSheet, } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0,0,0,0.1)',
};

const InterpolateColor = () => {
  const [theme, setTheme] = useState('light')

  // const progress = useSharedValue(0)
  const progress = useDerivedValue(() => {
    return theme == 'dark' ? withTiming(1) : withTiming(0)
  }, [theme])

  const rbgStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    )
    return { backgroundColor }
  })
  const rCircleStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    )
    return { backgroundColor }
  })
  const rTextStyles = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    )
    return { color }
  })

  return (
    <Animated.View style={[styles.screenContainer, styles.center, rbgStyles]}>
      <Animated.Text style={[styles.text, rTextStyles]}>Theme</Animated.Text>
      <Animated.View style={[styles.center, styles.circle, rCircleStyles]}>
        <Switch
          value={theme == 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light')
          }}
        />
      </Animated.View>
    </Animated.View>
  )
}

export default InterpolateColor

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 200,
    height: 200,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  text: {
    fontSize: 45,
    textTransform: 'uppercase',
    letterSpacing: 5,
    fontWeight: 'bold',
    marginBottom: 20,
  }
})

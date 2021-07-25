import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated'

const BOX_SIZE = 200
const WORDS = ['What\'s', 'up', 'devs']
const { width, height } = Dimensions.get('window')

export default function InterpolateScrollView() {
  const translateX = useSharedValue(0)
  const handleScroll = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x
  })

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        horizontal
        contentContainerStyle={{ flex: 1 }}
        pagingEnabled
      >
        {WORDS.map((word, idx) =>
          <Page translateX={translateX} title={word} index={idx} key={idx} />
        )}
      </Animated.ScrollView>
    </View>
  )
}


const Page = ({ title, index, translateX }) => {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];
  const rStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ scale }]
    }
  })

  const rTextStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    )
    const y = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, height / 2 * -1],
      Extrapolate.CLAMP
    )
    return { opacity, transform: [{ translateY: y }, { translateX: y }] }
  })
  return (
    <View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,256, 0.${index + 2})` }]}>
      <Animated.View style={[styles.box, rStyles]} >
        <Animated.View style={[rTextStyles]} >
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    backgroundColor: 'royalblue',
    borderRadius: BOX_SIZE / 2,
    width: BOX_SIZE,
    height: BOX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 35,
    color: 'white'
  }
})

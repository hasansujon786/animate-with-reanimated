import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, interpolateColor, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated'

const HEADER_MIN_HEIGHT = 50
const HEADER_MAX_HEIGHT = 200
const CONTENTS = new Array(20).fill('')

const AnimatedHeader2 = () => {
  const scrollYAnimatedValue = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollYAnimatedValue.value = event.contentOffset.y
    },
  })

  const RStyle = useAnimatedStyle(() => {
    const interpolateY = interpolate(
      scrollYAnimatedValue.value,
      [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    )

    const interpolateBg = interpolateColor(
      scrollYAnimatedValue.value,
      [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      ['#e91e63', '#1DA1F2']
    )

    return {
      height: interpolateY,
      backgroundColor: interpolateBg
    }
  })

  return (
    <View style={styles.container} >
      <Animated.View style={[styles.animatedHeaderContainer, RStyle]}>
        <Text style={styles.headerText}>Animated Header</Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {
          CONTENTS.map((_, key) =>
          (
            <View key={key} style={styles.item}>
              <Text style={styles.itemText}>Row No : {key}</Text>
            </View>
          ))
        }
      </Animated.ScrollView>

    </View>
  )
}

export default AnimatedHeader2

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",

    },
    animatedHeaderContainer: {
      position: 'absolute',
      top: (Platform.OS == 'ios') ? 20 : 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      elevation: 2
    },
    headerText: {
      color: 'white',
      fontSize: 22
    },
    item: {
      backgroundColor: '#ff9e80',
      margin: 8,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemText: {
      color: 'black',
      fontSize: 16
    }
  })




// https://www.skptricks.com/2019/06/react-native-scrollview-animated-header-example.html

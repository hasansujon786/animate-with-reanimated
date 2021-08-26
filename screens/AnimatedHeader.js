import React from 'react'
import { View, Platform, Text, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, useAnimatedScrollHandler } from 'react-native-reanimated'

const clamp = (value, lowerBound, upperBound) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const HEADER_HEIGHT = 50;
const TRANSLATION_Y_OFFSET = Platform.OS === 'ios' ? HEADER_HEIGHT : 0;

const CONTENTS = new Array(20).fill('Dolor dignissimos fuga dolore illum a molestiae Voluptate exercitationem nisi ad quos.')

const AnimatedHeader = () => {
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      const diff = event.contentOffset.y - ctx.prevY;
      translationY.value = clamp(translationY.value + diff, 0, HEADER_HEIGHT);
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y
    }
  });

  const RStyle = useAnimatedStyle(() => {
    const interpolateY = interpolate(
      translationY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolate.CLAMP
    )
    return {
      transform: [
        { translateY: interpolateY }
      ]
    }
  })

  return (
    <View flex={1}>
      <Animated.View style={[styles.header, RStyle]}>
        <Text>Header Text</Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: Platform.OS === 'android' ? HEADER_HEIGHT : 0 }}
        contentInset={{ top: HEADER_HEIGHT }}
        contentOffset={{ y: -TRANSLATION_Y_OFFSET }}
        progressViewOffset={HEADER_HEIGHT}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* <Button onPress={() => { animatedHeight.value = 20 }} title='press' /> */}
        {CONTENTS.map((text, i) =>
          <View key={i} style={styles.content}>
            <Text>{text}</Text>
          </View>
        )}
      </Animated.ScrollView>
    </View >
  )
}

export default AnimatedHeader


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: '#fc3',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fdfdfd'
  },
})

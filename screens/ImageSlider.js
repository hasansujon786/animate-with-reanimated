import React, { useRef } from 'react'
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import Animated, { useSharedValue, useAnimatedScrollHandler, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const IMAGES = [
  'https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1575032617751-6ddec2089882?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',
  'https://images.unsplash.com/photo-1506094543314-3747d5123bbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80',
]

const { width: SCREEN_WIDTH } = Dimensions.get('screen')
const SLIDER_IMAGE_WIDTH = SCREEN_WIDTH
const SLIDER_IMAGE_HEIGHT = 400
const DOT_SIZE = 8
const DOT_SPACE = 8
const DOT_INDECATOR_SIZE = DOT_SIZE + DOT_SPACE

const ImageView = ({ uri }) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri }} />
    </View>
  )
}

const ImageSlider = () => {
  const sliderFLRef = useRef(null)
  const scrollX = useSharedValue(0)
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x
  })

  const rDotIndicatorStyles = useAnimatedStyle(() => {
    const translateX = interpolate(scrollX.value,
      [0, SLIDER_IMAGE_WIDTH],
      [0, DOT_INDECATOR_SIZE]
    )
    return {
      transform: [
        { translateX }
      ]
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.imageSlider}>
        <AnimatedFlatList
          ref={(node) => (sliderFLRef.current = node)}
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={16}
          data={IMAGES}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(data) => <ImageView uri={data.item} />}
          snapToInterval={SLIDER_IMAGE_WIDTH}
          decelerationRate='fast'
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <View style={styles.dotWrapper}>
          {IMAGES.map((_, index) =>
            <View key={index} style={styles.dot}></View>
          )}
          <Animated.View style={[styles.dotIndecator, rDotIndicatorStyles]} />
        </View>
      </View>
    </View>
  )
}

export default ImageSlider

const styles = StyleSheet.create({
  imageContainer: {
    width: SLIDER_IMAGE_WIDTH,
    height: SLIDER_IMAGE_HEIGHT
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageSlider: {
    width: '100%',
    height: SLIDER_IMAGE_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
  },
  dotWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginRight: DOT_SPACE,
    backgroundColor: '#333',
  },
  dotIndecator: {
    width: DOT_INDECATOR_SIZE,
    height: DOT_INDECATOR_SIZE,
    borderRadius: DOT_INDECATOR_SIZE,
    borderColor: '#333',
    borderWidth: 2,
    position: 'absolute',
    left: -DOT_SIZE / 2,
    top: -DOT_SIZE / 2
  },
})


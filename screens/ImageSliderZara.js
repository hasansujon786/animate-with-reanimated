import React, { useCallback, useMemo, useRef } from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Animated, { useSharedValue, useAnimatedScrollHandler, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const IMAGES = [
  'https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1575032617751-6ddec2089882?ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',
  'https://images.unsplash.com/photo-1506094543314-3747d5123bbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80',
]

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

const Details = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('screen')
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [SCREEN_HEIGHT - SLIDER_IMAGE_HEIGHT - 10, '90%'], []);
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const renderItem = useCallback(
    (item, index) => (
      <View key={index} style={sheetStyles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
    >
      <BottomSheetScrollView contentContainerStyle={sheetStyles.contentContainer}>
        {data.map(renderItem)}
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const ImageSliderZara = () => {
  const sliderFLRef = useRef(null)
  const scrollY = useSharedValue(0)
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const rDotIndicatorStyles = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value,
      [0, SLIDER_IMAGE_HEIGHT],
      [0, DOT_INDECATOR_SIZE]
    )
    return {
      transform: [
        { translateY: translateY }
      ]
    }
  })

  const scrollToItem = (direction) => {
    const offset = direction ?
      scrollY.value + SLIDER_IMAGE_HEIGHT : scrollY.value - SLIDER_IMAGE_HEIGHT
    sliderFLRef.current.scrollToOffset({ offset, animated: true })
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.imageSlider}>
        <AnimatedFlatList
          ref={(node) => (sliderFLRef.current = node)}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          data={IMAGES}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(data) => <ImageView uri={data.item} />}
          snapToInterval={SLIDER_IMAGE_HEIGHT}
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

        <View style={styles.iconBtnWrapper}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => scrollToItem(false)}
          >
            <Feather color='#333' size={24} name='arrow-up' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => scrollToItem(true)}
          >
            <Feather color='#333' size={24} name='arrow-down' />
          </TouchableOpacity>
        </View>
      </View>
      <Details />
    </View>
  )
}

export default ImageSliderZara

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
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
  },
  dotWrapper: {
    position: 'absolute',
    top: SLIDER_IMAGE_HEIGHT / 2,
    left: 10,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    marginBottom: DOT_SPACE,
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
  iconBtnWrapper: {
    position: 'absolute',
    right: 4,
    bottom: 10,
  },
  iconBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetContentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue'
  },
})


const sheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
})


// https://www.youtube.com/watch?v=FIAPuq24b0g&list=WL&index=3&t=959s

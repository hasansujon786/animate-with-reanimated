import React, { useState, useCallback } from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedGestureHandler, withTiming, runOnJS } from 'react-native-reanimated'

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];
const TASKS = TITLES.map((title, index) => ({ title, id: index }));
const TAKS_ITEM_HEIGHT = 70

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS)
  const onDismiss = useCallback((id) => {
    console.log('id', id)
    setTasks((tasks) => tasks.filter((item) => item.id !== id));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle='default' />
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Tasks</Text>
        <TouchableOpacity onPress={() => setTasks(TASKS)} style={styles.iconBtn}>
          <Feather name='refresh-cw' color='tomato' size={TAKS_ITEM_HEIGHT * 0.4} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
        {tasks.map(task =>
          <Task onDismiss={onDismiss} key={task.id} id={task.id} title={task.title}></Task>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
export default SwipeToDelete

const Task = ({ title, id, onDismiss }) => {
  const translateX = useSharedValue(0)
  const shouldTaskBeDismissed = useSharedValue(0)

  const panGesture = useAnimatedGestureHandler({
    onActive(event) {
      translateX.value = event.translationX
    },
    onEnd() {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        shouldTaskBeDismissed.value = withTiming(1, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(id);
          }
        });
      } else {
        translateX.value = withTiming(0)
      }
    },
  })

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: translateX.value
      }]
    }
  })

  const rTaskContainerStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      shouldTaskBeDismissed.value,
      [0, 1],
      [1, 0]
    )
    const height = interpolate(
      shouldTaskBeDismissed.value,
      [0, 1],
      [TAKS_ITEM_HEIGHT, 0]
    )
    const marginTop = interpolate(
      shouldTaskBeDismissed.value,
      [0, 1],
      [20, 0]
    )

    return { opacity, height, marginTop }
  })

  return (
    <Animated.View style={[{ width: '90%' }, rTaskContainerStyles]}>
      <View style={styles.taskDelete}>
        <Feather name='trash-2' color='tomato' size={TAKS_ITEM_HEIGHT * 0.4} />
      </View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.taskItem, rStyles]}>
          <Text style={styles.taskText}>{title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  headingWrapper: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  heading: {
    marginTop: 20,
    fontSize: 40,
  },
  iconBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskItem: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 1,
  },
  taskText: {
    fontSize: 22,
  },
  taskDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    height: TAKS_ITEM_HEIGHT,
    width: TAKS_ITEM_HEIGHT,
    position: 'absolute',
    right: 10,
  }
})

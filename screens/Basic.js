import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat } from 'react-native-reanimated';

const handleRotation = (progress) => {
  'worklet'; 
  return `${progress.value * 2 * Math.PI}rad`
}

export default function Basic() {
  const scale = useSharedValue(2)
  const progress = useSharedValue(1)
  const aStyles = useAnimatedStyle(() => ({
    borderRadius: (progress.value * 100) / 2,
    transform: [{scale: scale.value}, {rotate: handleRotation(progress)}]
  }))


  useEffect(() => {

    scale.value = withRepeat(withSpring(1), -1, true)
    progress.value = withRepeat(withSpring(0.5), -1, true);
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, aStyles]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
  }
});

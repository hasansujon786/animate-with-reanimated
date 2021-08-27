import React from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, Button, Text, View } from 'react-native';

const ROUTE_NAMES = [
  'SwipeToDelete',
  'AnimatedHeader',
  'AnimatedHeader2',
  'CircularProgressBar',
  'ColorPicker',
  'InterpolateScrollView',
  'DbTap',
  'PinchGesture',
  'InterpolateColor',
  'PanGesture',
  'Basic',
]
const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#282C34' }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
      >
        <Text style={styles.heading}>ReactNative Animations</Text>
        {ROUTE_NAMES.map(routeName => (
          <TouchableOpacity key={routeName} onPress={() => navigation.navigate(routeName)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{routeName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Home


const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    color: '#E5C07B',
    textAlign: 'center',
    marginVertical: 30,
  },
  item: {
    backgroundColor: '#2C323C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 10,
    width: '100%'
  },
  itemText: {
    fontSize: 20,
    color: '#ABB2BF',
    textAlign: 'center'
  },
})

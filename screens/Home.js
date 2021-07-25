import React from 'react'
import { StyleSheet,Button, Text, View } from 'react-native';


const Home = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>home screen</Text>
      <Button
        onPress={() => navigation.openDrawer()}
        title='Open Drawer'
      />
    </View>
  )
}

export default Home

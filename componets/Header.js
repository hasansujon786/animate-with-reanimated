import React from 'react'
import { StyleSheet,Button, Text, View } from 'react-native';
import {useNavigation} from '@react-navigation/native'

const Header = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Button
        onPress={() => navigation.openDrawer()}
        title='Open Drawer'
      />
    </View>
  )
}

export default Header

import React, { useState } from 'react'

import { ScrollView, View, StyleSheet, Dimensions, Image, Pressable } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import Animated, { FadeInUp, Layout, Transition, ZoomIn, ZoomOut } from 'react-native-reanimated'

const { width } = Dimensions.get('window')
const SIZE = width / 2

export const Recipe = ({ recipe, onPress }) => {
  return (
    <Animated.View style={stylesRecipe.container} entering={ZoomIn} exiting={ZoomOut} layout={Layout.springify().duration(2000)}>
      <View style={stylesRecipe.card}>
        {/* <Image source={recipe.picture} style={styles.image} /> */}
        <Pressable onPress={onPress}>
          <Icon name='x' color='white' size={24} />
        </Pressable>
      </View>
    </Animated.View>
  )
}

const stylesRecipe = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    padding: 8,
  },
  card: {
    backgroundColor: 'tomato',
    flex: 1,
    padding: 8,
    alignItems: 'flex-end',
  },
  image: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
})

const defaultRecipes = [
  {
    id: 'hummus',
    title: 'Hummus',
    // picture: require('./assets/hummus.png'),
  },
  {
    id: 'broccoli-slaw',
    title: 'Broccoli slaw',
    // picture: require('./assets/broccoli-slaw.png'),
  },
  {
    id: 'morning-smoothies',
    title: 'Morning Smoothies',
    // picture: require('./assets/morning-smoothies.png'),
  },
  {
    id: 'fruity-oatmeal',
    title: 'Fruity Oatmeal',
    // picture: require('./assets/fruity-oatmeal.png'),
  },
  {
    id: 'belgian-waffels',
    title: 'Belgian Waffels',
    // picture: require('./assets/belgian-waffels.png'),
  },
  {
    id: 'french-toast',
    title: 'French toast',
    // picture: require('./assets/french-toast.png'),
  },
]

export const LayoutAnimations = () => {
  const [recipes, setRecipes] = useState(defaultRecipes)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipes.map((recipe, i) => (
        <Recipe
          recipe={recipe}
          key={recipe.id}
          onPress={() => {
            recipes.splice(i, 1)
            setRecipes([...recipes])
          }}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default LayoutAnimations

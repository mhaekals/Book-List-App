import 'react-native-gesture-handler'
import React  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from '../screen/HomeScreen'
import HomeDetailscreen from '../screen/HomeDetailScreen'
import AddBookScreen from '../screen/AddBookScreen'
import FavBookScreen from '../screen/FavBookScreen'
import EditBookScreen from '../screen/EditBookScreen'

const HomeStack = createStackNavigator()
const FavStack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

const HomeNavigation = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Detail" component={HomeDetailscreen} />
            <HomeStack.Screen name="AddBook" component={AddBookScreen} />
            <HomeStack.Screen name="EditBook" component={EditBookScreen} />
        </HomeStack.Navigator>
    )
}

const FavNavigation = () => {
    return (
        <FavStack.Navigator>
            <FavStack.Screen name="Favorites" component={FavBookScreen} />
        </FavStack.Navigator>
    )
}

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator>
                <BottomTab.Screen 
                    name="Home" 
                    component={HomeNavigation} 
                    options={{tabBarIcon: ({color, size}) => 
                        ( <Icon name="home" color={color} size={size} />
                    )}} />
                <BottomTab.Screen 
                    name="Favorites" 
                    component={FavNavigation}
                    options={{tabBarIcon: ({color, size}) => 
                        ( <Icon name="thumb-up" color={color} size={size} />
                    )}} />
            </BottomTab.Navigator>
        </NavigationContainer>

    )
}

export default RootNavigation

const styles = StyleSheet.create({})

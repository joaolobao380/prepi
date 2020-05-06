import React from 'react'
import { TouchableOpacity } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, DrawerActions } from '@react-navigation/native'


import Icon from 'react-native-vector-icons/Feather'

import Home from '../../screens/Home'

const Stack = createStackNavigator()





const IconMenu = () => {
    const navigation = useNavigation()
   
    return(
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name='menu' size={28} color='white' style={{marginLeft:15}}/>
        </TouchableOpacity>
    )
}

export default function RoutesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerTitle:false ,headerTitleAlign:'center', 
            headerLeft: props => <IconMenu {...props} />, headerTransparent:true}}    />
     

        </Stack.Navigator>
    )
}
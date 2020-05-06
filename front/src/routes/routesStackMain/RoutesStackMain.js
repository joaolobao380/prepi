import React from 'react'

import { createStackNavigator, HeaderBackground } from '@react-navigation/stack'

import Home from '../routesDrawer/RoutesDrawer'
import CadParts from '../../screens/CadParts'
import LookDetail from '../../screens/LookDetail'

const Stack = createStackNavigator()

export default function RoutesStack(){
    return(
        <Stack.Navigator>

            <Stack.Screen name='Home' component={Home} options={{headerTransparent:true, title:false}}/>
            <Stack.Screen name='CadParts' component={CadParts} options={{ title:'Partes dos Looks', headerTitleStyle:{color:'white'},headerTintColor:'white' ,headerStyle:{backgroundColor:'#9f28eb'}}}/>
            <Stack.Screen name='LookDetail' component={LookDetail} options={{ title:'Detalhe dos looks', headerTitleStyle:{color:'white'},headerTintColor:'white' ,headerStyle:{backgroundColor:'#9f28eb'}}}/>
            
        </Stack.Navigator>
    )
}
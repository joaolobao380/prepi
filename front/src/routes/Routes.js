import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {StatusBar} from 'react-native'

import RoutesStack from './routesStackMain/RoutesStackMain'

export default function Routes(){
    return(   
        <NavigationContainer>
            <StatusBar barStyle='light-content' translucent={true} backgroundColor={'transparent'} />
            <RoutesStack />
        </NavigationContainer>

    )
}
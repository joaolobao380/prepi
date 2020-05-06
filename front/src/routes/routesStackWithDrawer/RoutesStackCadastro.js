import React from 'react'


import { createStackNavigator } from '@react-navigation/stack'


import Cadastro from '../../screens/CadFull'


const Stack = createStackNavigator()






export default function RoutesStack(){
    return(
        <Stack.Navigator>
  
             <Stack.Screen name='Cadastro' component={Cadastro} options={{title:'Cadastro', 
            headerStyle:{backgroundColor:'#9f28eb'}, headerTitleStyle:{color:'white'}, 
            }} />

        </Stack.Navigator>
    )
}
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'

import {ImageBackground, Image, View, Text} from 'react-native'
import Home from '../routesStackWithDrawer/RoutesStackHome'

import Cadastro from '../routesStackWithDrawer/RoutesStackCadastro'

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    return (
      <View style={{flex:1}}>
     
       
            <ImageBackground source={require('../../../assets/barra.png')} style={{ width: 140, height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <DrawerContentScrollView {...props}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/avatar.png')}
                            style={{ height: 80, width: 80, borderRadius: 40, marginTop: 10, borderColor: '#9f28eb', borderWidth: 1, backgroundColor: 'white' }}></Image>
                        <Text style={{ fontSize: 20, color: 'white', marginTop: 10, marginBottom: 15, fontWeight: 'bold' }}>Prepi</Text>
                    </View>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </ImageBackground>
    
      
      </View>
    );
  }



export default function RoutesDrawer(){
    return(
    <Drawer.Navigator drawerType='front' drawerStyle={{width: 140, backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
                drawerContentOptions={{activeBackgroundColor: 'rgba(255, 255, 255, 0.1)',
                itemStyle: {  color: 'white' ,activeTintColor: 'white', alignItems:'flex-start'},
                labelStyle: {fontSize: 15, color: '#cacaca', fontWeight:'bold'},}}
                drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='Home' component={Home} options={{drawerLabel:'Home'}} />
            <Drawer.Screen name='Cadastro' component={Cadastro} options={{drawerLabel:'Cadastro'}} />
        </Drawer.Navigator>
    )
}
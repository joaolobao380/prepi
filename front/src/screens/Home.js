import React, {Component, Fragment} from 'react'
import {View, Text, Image, StyleSheet, ScrollView, Dimensions, FlatList} from 'react-native'
import axios from 'react-native-axios'
import {server, showError} from '../common'
import Icon from 'react-native-vector-icons/Feather'
import {Card} from 'react-native-paper'

//DESATIVAR O AVISO AMARELO
console.disableYellowBox = true



export default class Home extends Component{

    state={
        lookfull: [],
        isLoad:true,
    }

    
    componentDidMount = async () =>{
        setInterval(() => {
            this.getLookFull()
        }, 2000);
       
    }

    getLookFull = async () => {
        try{
            const res = await axios.get(`${server}/lookfull`)
            this.setState({lookfull:res.data})
            this.setState({isLoad:false})
         
        }catch(err){
            showError(err)
        }
        
    }

    showLookFull(){
        const columns = 2
        const {navigate} = this.props.navigation
        return(
            <View>
                <FlatList data={this.createRows(this.state.lookfull, columns)}
                    keyExtractor={item => `${item.id}`}

                    numColumns={columns}

                    renderItem={({ item }) => {
                        if (item.empty) {
                            return <View style={[styles.item, styles.itemEmpty]} />;
                        }
                        return (
                            <View style={styles.item}>
                                <View style={styles.containerLooks}>

                                    <Card style={styles.card}
                                        onPress={() => navigate('LookDetail', { id_external: item.id_external, titulo: item.titulo, descricao: item.titulo, preco: item.preco, imagem: item.imagem})}>
                                        <Card.Cover source={{ uri: item.imagem }} style={{ height: 170, resizeMode: 'stretch' }} />
                                        <View>
                                            <Text style={styles.texto} numberOfLines={1}>{item.titulo}</Text>
                                        </View>
                                    </Card>

                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        )
    }


    //NÃO DEIXAR QUE QUANDO SÓ TIVER 1 CARD, ESSE CARD NÃO OCUPE AS 2 COLUNAS
    createRows (data, columns) {
 
        const rows = Math.floor(data.length / columns); // [A]
        let lastRowElements = data.length - rows * columns; // [B]
        while (lastRowElements !== columns) { // [C]
            data.push({ // [D]
            NOT_FotoDestaque: `empty-${lastRowElements}`,
            NOT_Titulo: `empty-${lastRowElements}`,
       
            empty: true
          });
          lastRowElements += 1; // [E]
        }
        return data; // [F]
      }


    products(){
        return(
            <View>
       
                <View style={styles.product}>
                    <View style={styles.withoutProduct}>
                        <Icon name='package' size={100} color={'#cacaca'} />
                        <Text style={styles.labelWithoutProduct}>Não há produtos cadastrados</Text>
                    </View>
                 </View>
             </View>
        )
    }
    
    showLabelProducts(){
        return(
            <View style={styles.containerLabelProduct}>
                <Text style={styles.textLabelProduct}>Produtos</Text>
            </View>
        )
    }

    showHeader(){
        
        return(
            
            <View style={{backgroundColor:'black'}}>
           
         </View>
        )
    }


    render(){
        const screenHeight = Dimensions.get('window').height
        return(
            <Fragment>
                <ScrollView >
                    <View style={{ flex: 1 }}>

                        <View style={{ height: screenHeight / 1.7 }}>
                            <Image source={require('../../assets/header.png')} style={styles.imageBackground} />

                        </View>
                        {this.state.isLoad && 
                        this.products()}
                        {this.showLabelProducts()}
                        {this.showLookFull()}
                    </View>
                </ScrollView>
            </Fragment>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'white'
    },
    imageBackground:{
       
        height:'100%', 
        width:'100%'    
    },

    containerLabelProduct:{
        marginTop:30,
        marginLeft:10
    },
    textLabelProduct:{
        fontSize:20,
        color:'gray'
    },
    product:{
        marginTop:30,
        
    },
    withoutProduct:{
 
     
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:30,
        paddingTop:30,
        marginBottom:15,
    },
    labelWithoutProduct:{
        color:'gray',
        fontSize:15,
    },
    itemEmpty: {
        flex: 1,
        backgroundColor: "transparent"
      },
      item: {
        flex: 1,
        flexBasis: 0,
      },
      containerLooks: {
        flex:1,
        flexDirection: 'column',
        alignItems:'center'
        
      },
      card: {
          marginTop: 15,
          marginLeft: 12,
          marginRight:12,
          width:'93%',
          backgroundColor:'#9f28eb',
  
        },
      
        texto: {
          color: 'white',
          fontSize: 15,
          paddingLeft: 5,
          paddingTop: 10,
          paddingBottom: 10,
      
        },
    
})
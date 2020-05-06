import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, FlatList, ImageBackground, Image, TextInputComponent} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'react-native-axios'
import {server, showError} from '../common'
import {Card} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function LookDetailFunction(props) {
    const navigation = useNavigation();
  
    return <LookDetail {...props} navigation={navigation} />;
}


class LookDetail extends Component{

    state ={ 
        lookparts:[],
        imagem:this.props.route.params.imagem,
        descricao: this.props.route.params.descricao,
        titulo: this.props.route.params.titulo,
        preco: this.props.route.params.preco
    }

    componentDidMount = async () => {
        this.getLookParts()
       
    }

    getImagem(){
        return this.props.route.params.imagem
    }


    getLookParts = async () => {
        try{
            const res = await axios.get(`${server}/lookparts/${this.props.route.params.id_external}`)
            this.setState({lookparts:res.data})

        }catch(err){
            showError(err)
        }
        
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

    showLookParts(){
        const columns = 2
   
        return(
            <View>
                <FlatList data={this.createRows(this.state.lookparts, columns)}
                    keyExtractor={item => `${item.id}`}

                    numColumns={columns}

                    renderItem={({ item }) => {
                        if (item.empty) {
                            return <View style={[styles.item, styles.itemEmpty]} />;
                        }
                        return (
                            <View style={styles.item}>
                                <View style={styles.containerLooks}>

                                <Card style={styles.card} onPress={() => this.setState({imagem: item.imagem, titulo: item.titulo, descricao: item.descricao, preco: item.preco})}
                                        >
                                        <Card.Cover source={{ uri: item.imagem }} style={{  height:120,width:100, resizeMode: 'stretch' }} />
                                        <View>
                                   
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

    render(){
        return(
            <View style={styles.container}>
                
     
                
                <Image source={{uri: this.state.imagem}} style={styles.ImagemFundo} resizeMode='stretch' />

          
                <ScrollView>
                <View style={styles.containerData}>
                    <Text style={styles.textTitulo}>{this.state.titulo}</Text>
                    <Text style={styles.textPreco}>R$ {this.state.preco}</Text>
                </View>
                <Text style={styles.textDescricao}>{this.state.descricao}</Text>

                <Text style={styles.textLookPrincipal}>Look principal</Text>
                <TouchableOpacity onPress={() => this.setState({imagem: this.props.route.params.imagem, titulo:this.props.route.params.titulo, 
                    descricao: this.props.route.params.descricao, preco: this.props.route.params.preco })}>
                    <Image source={{uri: this.props.route.params.imagem}} style={styles.ImagemLookCompleto} resizeMode='stretch' />
                </TouchableOpacity>
                <Text style={styles.textPartsLook}>Partes do look</Text>
                 {this.showLookParts()}
                </ScrollView>
             
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    containerFundo:{
        
    },
    ImagemFundo:{
        
        height:'50%'
    },
    containerData:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    textTitulo:{
        fontSize:20,
        marginLeft:20,
        marginTop:20,
    },
    textPreco:{
        fontSize:20,
        marginLeft:20,
        marginTop:20,
    },
    textDescricao:{
        fontSize:15,
        color:'gray',
        marginLeft:20,
        marginTop:20,
    },
    containerLook:{
        height:'50%',
        width:'30%',
        marginTop:20,    
    },
    ImagemLookCompleto:{
        height:120,
        width:100,
        marginLeft:20,
        marginTop: 10,        
        
    },
    textLookPrincipal:{
        marginLeft:20,
        marginTop:10,
        fontWeight:'bold'
    },
    textPartsLook:{
        marginLeft:20,
        fontWeight:'bold',
        marginTop:10,
    },
    card: {
        marginTop: 15,
        marginLeft: 12,
        marginRight:12,
        height:120,
        width:100,
        backgroundColor:'#9f28eb',

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
})
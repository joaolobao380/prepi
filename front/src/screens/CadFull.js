import React, {Component} from 'react'
import {View, Text, StyleSheet, Modal, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Alert, FlatList, ActivityIndicator} from 'react-native'
import { FAB } from 'react-native-paper'
import {Button} from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import axios from 'react-native-axios'
import {server, showError} from '../common'
import { useNavigation } from '@react-navigation/native'
import {Card} from 'react-native-paper'



//PALIATIVO PARA USAR A NAVEGAÇÃO 5X
export default function CadastroFullFunction(props) {
    const navigation = useNavigation();
  
    return <CadFull {...props} navigation={navigation} />;
}

 class CadFull extends Component{

    state = {
        titulo:'',
        descricao:'',
        preco:'',
        imagem:null,
        isVisibleModal:false,
        id_external:Math.floor(Math.random() * 100) + 1 ,
        lookfull: [],
        //O LOOK VAI IMPEDIR QUE O MODAL DE CADPARTS ABRA SEM QUE O CADASTRO TENHA SIDO INICIADO.
        lock:0,
        isLoad:true,
    }

    componentDidMount = async() => {
        //APENAS PARA TESTE
        setInterval(() => {
            this.getLookFull()
        }, 2000);
        
    }

    //MOSTRAR TODOS OS LOOKS COMPLETOS
    getLookFull = async () => {
        try{
            const res = await axios.get(`${server}/lookfull`)
            this.setState({lookfull:res.data})
            this.setState({isLoad:false})
         
        }catch(err){
            showError(err)
        }
        
    }
    
    //REQUISIÇÃO DE UM NOVO LOOK COMPLETO.
    cadlookfull = async () => {
        const {navigate} = this.props.navigation
        try{
            if(this.state.titulo == '' || this.state.descricao == '' || this.state.preco == '' || this.state.imagem == null){
                Alert.alert('Atenção', 'Preencha todos os campos!')
            }else{
                
                axios.post(`${server}/fullsave`, {
                    titulo: this.state.titulo,
                    descricao:this.state.descricao,
                    preco: this.state.preco,
                    imagem: this.state.imagem,
                    id_external: this.state.id_external
                }).then(res => {
                   
                    this.setState({isVisibleModal:false})
                  
                    this.setState({lock:1})
                    navigate('CadParts', {id_external: this.state.id_external, lock: this.state.lock})
                   
                    this.setState({id_external:Math.floor(Math.random() * 100) + 1 })
                    this.setState({lock:0})
                    
                }).catch(err =>{
                    Alert.alert('Erro', 'Erro ao tentar salvar o registro')
                 
                })
            }
            this.setState({titulo: '', imagem: '', descricao: ''})
            
        }catch(err){
            showError(err)
        }
        
    }


    PegarFoto() {

        ImagePicker.showImagePicker({ 
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800, 
            storageOptions: {
                skipBackup: true,
                path: 'images',
              },},
             (response) => {
      
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else{
                const source = { uri: 'data:image/jpeg;base64,' + response.data }
          
        
                this.setState({imagem:source.uri}) 
     
    
            }
          });

    }




    emptyLook(){
        return (
            <View style={styles.containerEmptyLooks}>
                <Text style={styles.addLook}>Clique para adicionear um Look completo</Text>
            </View>
        )
    }

    ButtonFAB(){
        return(
        <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() => this.setState({isVisibleModal:true})}
        />
        )
    }

  
    //MOSTRAR O MODAL, ATRAVES DELE É POSSIVEL FAZER TODO O CADASTRO DO LOOK COMPLETO
    screenModal(){
        return(
            <Modal visible={this.state.isVisibleModal} transparent={true} animationType='fade' statusBarTranslucent={true}>

                <View style={styles.modalBoxArea}>
                    <View style={styles.modalBox}>
                        <View style={styles.modalClose}>
                            <TouchableOpacity onPress={() => this.setState({ isVisibleModal: false })}>
                                <Text style={styles.closeText}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>

                            <KeyboardAvoidingView
                                behavior="position"
                                enabled>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Adicione um Look completo</Text>
                                </View>
                                <Text style={{ marginBottom: 10 }}>Imagem</Text>
                                <View style={{ width: 100, height: 120, borderColor: 'black', borderRightWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, alignItems: 'center', marginBottom: 10 }}>

                                    <Image source={{ uri: this.state.imagem }} style={{ width: 100, height: 120 }} resizeMode='stretch' />

                                </View>
                                <TouchableOpacity onPress={() => this.PegarFoto()}>
                                    <Text style={{ marginBottom: 10, color: '#9f28eb', fontWeight: 'bold' }}>Adicione uma imagem</Text>
                                </TouchableOpacity>

                                <TextInput placeholder='Ex: Loook de verão' underlineColorAndroid='#cccccc' 
                                value={this.state.titulo} onChangeText={titulo => this.setState({ titulo })}></TextInput>

                                <TextInput placeholder='Ex: blusa sem manga e short...' underlineColorAndroid='#cccccc'
                                 value={this.state.descricao} onChangeText={descricao => this.setState({ descricao })}></TextInput>

                                <TextInput placeholder='Ex: R$ 100,00' underlineColorAndroid='#cccccc' 
                                value={this.state.preco} onChangeText={preco => this.setState({ preco })} ></TextInput>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Button title='Salvar' containerStyle={{ width: '40%', marginTop: 30 }} buttonStyle={{ backgroundColor: '#9f28eb' }}
                                     onPress={() => this.cadlookfull()} />
                                    <Button title='Cancelar' containerStyle={{ width: '40%', marginTop: 30 }} buttonStyle={{ backgroundColor: '#9f28eb' }}
                                     onPress={() => this.setState({isVisibleModal: false})} />
                                </View>
                            </KeyboardAvoidingView>

                        </View>

                    </View>

                </View>

            </Modal>
        )
    }



    // MOSTRAR OS LOOKS COMPLETOS
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
                                        onPress={() => navigate('CadParts', { id_external: item.id_external})}>
                                        <Card.Cover source={{ uri: item.imagem }} style={{ height: 170, resizeMode: 'stretch' }} />
                                        <View>
                                            <Text style={styles.texto} numberOfLines={1}>{item.titulo}</Text>
                                            <Text style={styles.texto} numberOfLines={1}>R$ {item.preco}</Text>
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


      showLoad(){
        
        return(
            
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
  
    }


    render(){
       
        return(
            <View style={styles.container}>
                {this.state.isLoad && 
                 this.showLoad()}
                {this.screenModal()}
                {this.showLookFull()}
                {!this.state.lookfull && 
                this.emptyLook()
                }
                {this.ButtonFAB()}
            </View>
                
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    containerShowLookFull:{
        // flexDirection: 'column',
        // alignItems:'center'
    },
    containerEmptyLooks:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    addLook:{
        fontSize:18,
        color:'gray',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:'#9f28eb'
      },
      modalBoxArea:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        justifyContent:'center',
        alignItems:'center',
    },
    modalBox:{
        width:'90%',
        padding:20,
        backgroundColor:'#fff',
    },
    modalClose:{
        height:40,
        alignSelf:'flex-end',
    },
    closeText:{
        fontSize:25,
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


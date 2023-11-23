import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TextInput, Dimensions, TouchableNativeFeedback, FlatList, Alert } from 'react-native'
import commonStyles from '../commonStyles'
import RelatorioLista from './RelatorioLista';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input'
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    relatorio: [],
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const horaMask = [/\d/, /\d/, ':', /\d/, /\d/]

export default class Relatorio extends Component {

    state = {
        ...initialState
    }

    renderItem = ({ item, index }) => {
        return <RelatorioLista tipo={'relatorio'} delete={this.delete} {...item} index={index} />
    }

    storeData = async (value, key) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
        }
    };

    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    onShow = async () => {
        const relatorio = await this.getData('relatorio')
        if (relatorio !== null) {
            this.setState({ relatorio: relatorio })
        }
    }

    delete = async (placa) => {
        Alert.alert(
            'Excluir',
            `Deseja excluir o carro ${placa}?`,
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Sim', onPress: async () => {
                        const relatorio = this.state.relatorio.filter(item => item.placa !== placa)
                        this.setState({ relatorio: relatorio })
                        await this.storeData(relatorio, 'relatorio')
                    }
                }
            ],
            { cancelable: false }
        );
    }



    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType='fade' onShow={this.onShow} >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    
                </View>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        flex:4,
        backgroundColor: '#FFF',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: commonStyles.colors.primary,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navbarText: {
        fontSize: 20,
        color: commonStyles.colors.secondary,
        fontWeight: 'bold'
    },
    placa: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
        borderTopWidth: 8,
        borderColor: commonStyles.colors.secondary,
        backgroundColor: commonStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placaText: {
        color: commonStyles.colors.secondary,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    entradaText: {
        fontSize: 15,
        marginLeft: 5
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#171717',
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300

    },
    lista: {
        flex:1,
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        shadowColor: '#171717',
        elevation: 10,
        backgroundColor: '#fff',
    
    }

})
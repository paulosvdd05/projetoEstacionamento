import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableNativeFeedback, FlatList } from 'react-native'
import commonStyles from '../commonStyles'
import VagaLista from './VagaLista';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input'
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    numeroVagas: ''
}

const horaMask = [/\d/, /\d/, ':', /\d/, /\d/]

export default class NumeroVagas extends Component {

    state = {
        ...initialState
    }

    renderItem = ({ item, index }) => {
        return <VagaLista tipo={'relatorio'} {...item} index={index} />
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




    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType='fade' onShow={this.onShow} >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <Text style={styles.navbarText}>Número de Vagas</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', padding:20}}>
                        <TextInput
                            style={styles.input}
                            value={this.state.numeroVagas}
                            onChangeText={(vagas) => this.setState({ numeroVagas: vagas })}
                            placeholder='Número máximo de vagas...'
                            keyboardType='numeric'
                        />
                        <TouchableNativeFeedback onPress={()=>this.props.setMaxVagas(this.state.numeroVagas)}>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, backgroundColor: commonStyles.colors.secondary, marginTop: 20 }}>
                                <Icon name='check-bold' size={22} color='#fff' />
                            </View>
                        </TouchableNativeFeedback>
                    </View>

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
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {

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
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        shadowColor: '#171717',
        elevation: 10,
        backgroundColor: '#fff',
        zIndex: -2
    }

})
import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableNativeFeedback } from 'react-native'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input'

const initialState = {
    hora: ''
}

const horaMask = [/\d/, /\d/, ':', /\d/, /\d/]

export default class SaidaCarro extends Component {

    state = {
        ...initialState
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType='fade' >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <Text style={styles.navbarText}>Saída</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <View style={styles.placa}>
                            <Text style={styles.placaText}>{this.props.placa}</Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.entradaText}>Hora de Saída:</Text>
                            <MaskInput style={styles.input}
                                value={this.state.hora}
                                onChangeText={(masked, unmasked) => this.setState({ hora: masked })}
                                placeholder='Digite a hora de saída...'
                                keyboardType='numeric'
                                mask={horaMask}
                            />
                        </View>
                        <View>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: "#f00", borderRadius: 10, padding: 10, marginVertical: 20 }}>
                                    <Icon name='exit-to-app' size={22} color='#fff' />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
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

})
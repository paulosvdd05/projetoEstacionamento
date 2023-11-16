import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native'
import commonStyles from '../commonStyles'

const initialState = {
    hora: ''
}

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
                        <View style={{marginTop:20}}>
                            <Text style={styles.entradaText}>Hora de Saída:</Text>
                            <TextInput style={styles.input}
                                value={this.state.hora}
                                onChangeText={(hora) => this.setState({ hora })}
                                placeholder='digite a hora de saída...'
                                keyboardType='numeric'
                            />
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
        flex: 1,
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
        width:300

    },

})
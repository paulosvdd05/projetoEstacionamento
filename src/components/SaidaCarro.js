import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableNativeFeedback, Alert } from 'react-native'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input'

const initialState = {
    hora: '',
    valorHora: 1,
    horaEntrada: 0,
    minutoEntrada: 0,
    total: 0
}

const horaMask = [/\d/, /\d/, ':', /\d/, /\d/]

export default class SaidaCarro extends Component {

    state = {
        ...initialState
    }

    onShow = () => {

    }

    calculaTotal = () => {

        const horaSaida = this.state.hora.split(":")[0] == '' ? 0 : this.state.hora.split(":")[0]
        const minutoSaida = this.state.hora.split(":")[1] == undefined ? '00' : this.state.hora.split(":")[1]
        const horaEntrada = this.props.horaEntrada
        const minutoEntrada = this.props.minutoEntrada
        let diferencaHora = horaSaida - horaEntrada
        const diferencaMinuto = minutoSaida - minutoEntrada
        console.log(
            horaSaida,
            minutoSaida,
            horaEntrada,
            minutoEntrada,
        );
        if (diferencaHora !== 0 && horaSaida !== 0) {
            if (horaSaida < horaEntrada) {
                diferencaHora = 24 - parseInt(horaEntrada) + parseInt(horaSaida)
                let horaEmMinuto = diferencaHora * 60
                let minutoTotal = horaEmMinuto + diferencaMinuto
                let totalPagar = (minutoTotal / 60).toString().split('.')[1] > 0 ? (minutoTotal / 60).toString().split('.')[0] * this.state.valorHora + this.state.valorHora : (minutoTotal / 60).toString().split('.')[0] * this.state.valorHora
                this.setState({ total: totalPagar })
            } else {
                let horaEmMinuto = diferencaHora * 60
                let minutoTotal = horaEmMinuto + diferencaMinuto
                let totalPagar = (minutoTotal / 60).toString().split('.')[1] > 0 ? (minutoTotal / 60).toString().split('.')[0] * this.state.valorHora + this.state.valorHora : (minutoTotal / 60).toString().split('.')[0] * this.state.valorHora
                this.setState({ total: totalPagar })
            }
        } else {
            this.setState({ total: this.state.valorHora })
        }
    }

    darSaida = () => {
        if (this.state.hora.split(':')[0] != '') {
            if (parseInt(this.state.hora.split(':')[0]) <= 24) {
                this.props.saidaVaga(this.props.placa, this.state.total, this.state.hora, `${this.props.horaEntrada}:${this.props.minutoEntrada}`)
            } else {
                Alert.alert('Erro', 'Hora inválida')
            }
        } else {
            Alert.alert('Erro', 'Digite a hora de saída')
        }
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType='fade' onShow={this.calculaTotal} >
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
                        <Text>{this.props.horaEntrada}:{this.props.minutoEntrada}</Text>
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
                        <View style={{ marginTop: 20 }}>
                            <TouchableNativeFeedback onPress={this.calculaTotal}>
                                <View style={{ backgroundColor: "#0f0", borderRadius: 10, padding: 10, marginVertical: 20, alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Calcular</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <Text>Total: R${new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(this.state.total)}</Text>
                        </View>
                        <View>
                            <TouchableNativeFeedback onPress={this.darSaida}>
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
            </Modal >
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
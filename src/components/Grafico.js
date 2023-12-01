import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TextInput, Dimensions, TouchableNativeFeedback, FlatList, Alert } from 'react-native'
import commonStyles from '../commonStyles'
import { BarChart } from 'react-native-chart-kit';
import RelatorioLista from './RelatorioLista';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input'
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    relatorio: [],
    horaEntrada: '0:0',
    horaSaida: '0:0'
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const horaMask = [/\d/, /\d/, ':', /\d/, /\d/]

export default class Grafico extends Component {

    state = {
        ...initialState
    }

    onShow = () =>{
        this.setState({horaEntrada: this.props.horaEntrada})
        this.setState({horaSaida: this.props.horaSaida})
    }




    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType='fade' onShow={this.onShow} >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <Text style={styles.navbarText}>Gráfico</Text>
                    </View>
                    <View>
                    <BarChart
                        data={{
                            labels: ["Entrada", "Saída"],
                            datasets: [
                                {
                                    data: [
                                        this.state.horaEntrada.split(":")[0], this.state.horaSaida.split(":")[0]
                                        ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={300}
                        fromZero={true}
                        showValuesOnTopOfBars={true}
                        yAxisSuffix="Hrs"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: commonStyles.colors.primary,
                            backgroundGradientTo: commonStyles.colors.primary,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: () => commonStyles.colors.secondary,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ff0ff0"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    </View>
                    <View style={{alignItems:'center'}}>
                    <TouchableNativeFeedback onPress={this.props.onCancel}>
                        <View style={{padding:5, backgroundColor:'#f00', justifyContent:'center', alignItems:'center', width:100, borderRadius:10}}>
                            <Icon name='exit-to-app' size={30} color={"#fff"} style={{ margin: 10 }} />
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
        
        height:450,
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
        flex: 1,
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        shadowColor: '#171717',
        elevation: 10,
        backgroundColor: '#fff',

    }

})
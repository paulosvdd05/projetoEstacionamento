import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, TextInput, Dimensions, FlatList, Alert, TouchableOpacity } from 'react-native'
import SaidaCarro from '../components/SaidaCarro'
import Relatorio from '../components/Relatorio'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import VagaLista from '../components/VagaLista';
import MaskInput from 'react-native-mask-input'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  idCarro: 0,
  vagas: 30,
  valorHora: 1.00,
  carros: [],
  relatorio: [],
  showEntrada: false,
  showRelatorio: false,
  placa: '',
  placaSaida: '',
  horaSaida: '',
  minutoSaida: '',
  horaEntrada: ''

}

const placaMask = [/./, /./, /./, '-', /\d/, /\d/, /\d/, /\d/]
const horaMask = [/\d/, /\d/, ':', /\d/, /\d/]

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class App extends Component {

  state = {
    ...initialState
  }

  componentDidMount = async () => {
    const carros = await this.getData('vagas')
    const relatorio = await this.getData('relatorio')
    if (carros !== null) {
      this.setState({ carros: carros })
    }
    if (relatorio !== null) {
      this.setState({ relatorio: relatorio })
    }
  }

  preencherVaga = () => {
    this.setState({ carros: [...this.state.carros, { placa: this.state.placa, horaEntrada: this.state.horaEntrada }] }, () => {
      this.setState({ placa: '', horaEntrada: '' }, async () => {
        await this.storeData(this.state.carros, 'vagas')
      })
    })
  }

  delete = (placa, horaEntrada, minutoEntrada) => {
    this.setState({ placaSaida: placa, horaSaida: horaEntrada, minutoSaida: minutoEntrada }, () => this.setState({ showEntrada: true }, async () => {
      await this.storeData(this.state.carros, 'vagas')
    }))
    // Alert.alert('Excluir', 'Deseja dar saída ao carro?', [
    //   {
    //     text: 'Sim',
    //     onPress: () => this.setState({ carros: this.state.carros.filter(carro => carro.placa !== placa) })
    //   },
    //   {
    //     text: 'Cancelar'
    //   }
    // ])

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

  saidaVaga = (placa, total, horaSaida, horaEntrada) => {
    Alert.alert('Excluir', `Deseja dar saída ao Carro: ${placa} \n Total a pagar: ${total}`, [
      {
        text: 'Sim',
        onPress: () => this.setState({ carros: this.state.carros.filter(carro => carro.placa !== placa) }, () => {
          this.setState({ showEntrada: false, relatorio: [...this.state.relatorio, { placa: placa, horaEntrada: horaEntrada, horaSaida: horaSaida, total: total }] },
            async () => {
              await this.storeData(this.state.relatorio, 'relatorio')
              await this.storeData(this.state.carros, 'vagas')

            })
        })
      },
      {
        text: 'Cancelar'
      }
    ])
  }
  renderItem = ({ item, index }) => {
    return <VagaLista {...item} index={index} delete={this.delete} />
  }


  render = () => {
    return (
      <View style={styles.conatiner}>
        <View style={styles.navbar}>
          <Text style={{ width: 35 }}></Text>
          <Text style={styles.navbarText}>Estacionamento</Text>
          <TouchableOpacity onPress={async () => this.setState({showRelatorio:true})}>
            <Icon style={{ marginRight: 5 }} name={'history'} size={30} color={commonStyles.colors.secondary} />
          </TouchableOpacity>

        </View>
        <View style={styles.main}>
          <View style={styles.entrada}>
            <View style={{ width: windowWidth / 2 }}>
              <Text style={styles.entradaText}>Placa:</Text>

              <MaskInput style={styles.input}
                value={this.state.placa}
                onChangeText={(masked, unmasked) => this.setState({ placa: masked.toUpperCase() })}
                placeholder='Digite a placa...'
                mask={placaMask}
              />
            </View>
            <View style={{ width: windowWidth / 6 }}>
              <Text style={styles.entradaText}>Hora:</Text>
              <MaskInput style={styles.input}
                value={this.state.horaEntrada}
                onChangeText={(masked, unmasked) => this.setState({ horaEntrada: masked })}
                placeholder='Hora...'
                keyboardType='numeric'
                mask={horaMask}
              />
            </View>
            <TouchableNativeFeedback onPress={this.preencherVaga}>
              <View style={styles.button}>
                <Icon name={'car'} size={30} color={commonStyles.colors.secondary} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.lista}>
            <FlatList style={styles.prodList}
              //se  a busca estiver vazia ele retorna todos itens ativos em ordem alfabetica, se nao ele filtra pela descrição ou caso a etiqueta seja inserida por completa
              data={this.state.carros}
              keyExtractor={item => item.placa}
              renderItem={this.renderItem}
            />
          </View>
          <SaidaCarro onCancel={() => this.setState({ showEntrada: false })} isVisible={this.state.showEntrada} placa={this.state.placaSaida} horaEntrada={this.state.horaSaida} minutoEntrada={this.state.minutoSaida} saidaVaga={this.saidaVaga} />
          <Relatorio onCancel={() => this.setState({ showRelatorio: false })} isVisible={this.state.showRelatorio} />
        </View>

      </View>
    )

  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  navbar: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  navbarText: {
    color: commonStyles.colors.secondary,
    fontWeight: 'bold',
    fontSize: 20
  },
  main: {
    flex: 14,
    marginHorizontal: 10,
    marginVertical: 10
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: commonStyles.colors.primary,
    shadowColor: '#171717',
    elevation: 15,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth / 5
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,

  },
  entrada: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  entradaText: {
    fontSize: 15,
    marginLeft: 5
  },
  lista: {
    borderRadius: 10,
    flex: 8,
    marginVertical: 10,
    justifyContent: 'space-between',
    shadowColor: '#171717',
    elevation: 10,
    backgroundColor: '#fff',
    zIndex: -2
  }
})
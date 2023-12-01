import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, TextInput, Dimensions, FlatList, Alert, TouchableOpacity } from 'react-native'
import SaidaCarro from '../components/SaidaCarro'
import Relatorio from '../components/Relatorio'
import NumeroVagas from '../components/NumeroVagas'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import VagaLista from '../components/VagaLista';
import Grafico from '../components/Grafico'
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
  horaEntrada: '',
  maximoVagas: 0,
  numVagasAtual: 0,
  showNumeroVagas: false,
  showGrafico: false,
  todasEntrada: [],
  modaHoraEntrada: '0:0',
  utlimaContagemModa: 0,
  todasSaida: [],
  modaHoraSaida: '0:0',
  utlimaContagemModaSaida: 0

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
    const maximoVagas = await this.getData('maximoVagas')
    const todasEntrada = await this.getData('todasEntrada')
    const modaHoraEntrada = await this.getData('modaHoraEntrada')
    const utlimaContagemModa = await this.getData('utlimaContagemModa')
    const modaHoraSaida = await this.getData('modaHoraSaida')
    const utlimaContagemModaSaida = await this.getData('utlimaContagemModaSaida')
    if (carros !== null) {
      this.setState({ carros: carros })
    }
    if (relatorio !== null) {
      this.setState({ relatorio: relatorio })
    }
    if (maximoVagas !== null) {
      this.setState({ maximoVagas: maximoVagas })
    }
    if (todasEntrada !== null) {
      this.setState({ todasEntrada: todasEntrada })
    }
    if (modaHoraEntrada !== null) {
      this.setState({ modaHoraEntrada: modaHoraEntrada })
    }
    if (utlimaContagemModa !== null) {
      this.setState({ utlimaContagemModa: utlimaContagemModa })
    }
    if (modaHoraSaida !== null) {
      this.setState({ modaHoraSaida: modaHoraSaida })
    }
    if (utlimaContagemModaSaida !== null) {
      this.setState({ utlimaContagemModaSaida: utlimaContagemModaSaida })
    }

    this.state.carros != '' ? this.setState({ numVagasAtual: this.state.carros.length }) : null

  }

  preencherVaga = () => {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    if (this.state.placa.length == 8) {
      if (isNumber(this.state.placa.split('-')[0]) == false && isNumber(this.state.placa.split('-')[1]) == true) {
        if (this.state.placa.length) {
          if (this.state.numVagasAtual < this.state.maximoVagas) {
            if (this.state.carros.filter(carro => carro.placa == this.state.placa).length <= 0) {
              if (parseInt(this.state.horaEntrada.split(':')[0]) < 24 && parseInt(this.state.horaEntrada.split(':')[1]) < 60) {
                this.setState({ carros: [...this.state.carros, { placa: this.state.placa, horaEntrada: this.state.horaEntrada }], todasEntrada: [...this.state.todasEntrada, { hora: this.state.horaEntrada }] }, () => {
                  this.setState({ placa: '', horaEntrada: '', numVagasAtual: this.state.carros.length }, async () => {
                    //logica de ver qual horario teve mais entrada
                    this.state.todasEntrada.forEach(i => {
                      let count = 0
                      this.state.todasEntrada.forEach(j => i.hora == j.hora ? count++ : null)
                      if (count => this.state.utlimaContagemModa) {
                        this.setState({ utlimaContagemModa: count, modaHoraEntrada: i.hora }, async () => {
                          await this.storeData(this.state.modaHoraEntrada, 'modaHoraEntrada')
                          await this.storeData(this.state.utlimaContagemModa, 'utlimaContagemModa')
                        })
                      }


                    });
                    await this.storeData(this.state.carros, 'vagas')
                    await this.storeData(this.state.todasEntrada, 'todasEntrada')
                  })
                })
              } else {
                Alert.alert('Atenção', 'Hora inválida!')
              }

            } else {
              Alert.alert('Atenção', 'Carro já estacionado!')
            }

          } else {
            Alert.alert('Atenção', 'Não há vagas disponíveis! Aumente o numero de vagas no canto superior esquerdo do App.')
          }
        } else {
          Alert.alert('Atenção', 'Preencha todos os campos!')
        }
      } else {
        Alert.alert('Atenção', 'Preencha a placa com o padrão AAA-0000')
      }
    } else {
      Alert.alert('Atenção', 'Preencha a placa por completo')
    }


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
          this.setState({ showEntrada: false, todasSaida: [...this.state.todasSaida, { hora: `${horaSaida}` }], numVagasAtual: this.state.carros.length, relatorio: [...this.state.relatorio, { placa: placa, horaEntrada: horaEntrada, horaSaida: horaSaida, total: total }] },
            async () => {
              this.state.todasSaida.forEach(i => {
                let count = 0
                this.state.todasSaida.forEach(j => i.hora == j.hora ? count++ : null)
                if (count => this.state.utlimaContagemModaSaida) {
                  this.setState({ utlimaContagemModaSaida: count, modaHoraSaida: i.hora }, async () => {
                    await this.storeData(this.state.modaHoraSaida, 'modaHoraSaida')
                    await this.storeData(this.state.utlimaContagemModaSaida, 'utlimaContagemModaSaida')
                  })
                }


              });
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

  setMaxVagas = (numeroVagas) => {
    this.setState({ maximoVagas: numeroVagas, showNumeroVagas: false }, async () => {
      await this.storeData(this.state.maximoVagas, 'maximoVagas')
    })
  }


  render = () => {
    return (
      <View style={styles.conatiner}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => this.setState({ showNumeroVagas: true })}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: commonStyles.colors.secondary, marginLeft: 5 }}>{this.state.numVagasAtual}/{this.state.maximoVagas}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => this.setState({ showGrafico: true })}>
            <Icon name={'chart-box'} size={30} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => this.setState({ showRelatorio: true })}>
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
          <NumeroVagas onCancel={() => this.setState({ showNumeroVagas: false })} isVisible={this.state.showNumeroVagas} setMaxVagas={this.setMaxVagas} />
          <Grafico onCancel={() => this.setState({ showGrafico: false })} isVisible={this.state.showGrafico} horaEntrada={this.state.modaHoraEntrada} horaSaida={this.state.modaHoraSaida} />
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
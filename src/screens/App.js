import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, TextInput, Dimensions, FlatList } from 'react-native'
import EntradaCarro from '../components/EntradaCarro'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import VagaLista from '../components/VagaLista';

const initialState = {
  vagas: 30,
  valorHora: 1.00,
  carros: [],
  showEntrada: false,
  placa: '',
  hora: ''

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class App extends Component {

  state = {
    ...initialState
  }

  preencherVaga = () => {
    this.setState({ carros: [...this.state.carros, { placa: this.state.placa, hora: this.state.hora }] }, () => {
      this.setState({ placa: '', hora: '' }, () => console.log(this.state.carros))
    })
  }

  renderItem = ({ item, index }) => {
    return <VagaLista {...item} index={index} />
  }


  render = () => {
    return (
      <View style={styles.conatiner}>
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>ESTACIONAMENTO</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.entrada}>
            <View style={{ width: windowWidth / 2 }}>
              <Text style={styles.entradaText}>Placa:</Text>
              <TextInput style={styles.input}
                value={this.state.placa}
                onChangeText={(placa) => this.setState({ placa })}
                placeholder='Digite a placa...'
              />
            </View>
            <View style={{ width: windowWidth / 6 }}>
              <Text style={styles.entradaText}>Hora:</Text>
              <TextInput style={styles.input}
                value={this.state.hora}
                onChangeText={(hora) => this.setState({ hora })}
                placeholder='Hora...'
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
              keyExtractor={item => item.id}
              renderItem={this.renderItem}


            />
          </View>
          <EntradaCarro onCancel={() => this.setState({ showEntrada: false })} isVisible={this.state.showEntrada} />

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarText: {
    color: commonStyles.colors.secondary,
    fontWeight: 'bold',
    fontSize: 20
  },
  main: {
    flex: 11,
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
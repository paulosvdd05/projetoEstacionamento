import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, TextInput, Dimensions } from 'react-native'
import EntradaCarro from '../components/EntradaCarro'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const initialState = {
  vagas: 30,
  valorHora: 1.00,
  carros: [],
  showEntrada: false,
  placa: ''
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class App extends Component {

  state = {
    ...initialState
  }

  render = () => {
    return (
      <View style={styles.conatiner}>
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>ESTACIONAMENTO</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.entrada}>
            <View style={{width:windowWidth/2}}>
              <Text style={styles.entradaText}>Placa:</Text>
              <TextInput style={styles.input}
                value={this.state.placa}
                onChangeText={(placa) => this.setState({ placa })}
              />
            </View>
            <View style={{width:windowWidth/6}}>
              <Text style={styles.entradaText}>Hora:</Text>
              <TextInput style={styles.input}
                value={this.state.placa}
                onChangeText={(placa) => this.setState({ placa })}
              />
            </View>
            <TouchableNativeFeedback onPress={() => this.setState({ showEntrada: true })}>
              <View style={styles.button}>
                <Icon name={'car'} size={30} color={commonStyles.colors.secondary} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.lista}>

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
    width:windowWidth/5
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
    
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
    flex: 8
  }
})
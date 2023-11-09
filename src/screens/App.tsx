import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import EntradaCarro from '../components/EntradaCarro'
import commonStyles from '../commonStyles'

const initialState = {
  vagas: 30,
  valorHora:1.00,
  carros:[],
  showEntrada: false
}

export default class App extends Component {

  state={
    ...initialState
  }

  render = () => {
    return (
      <View style={styles.conatiner}>
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>ESTACIONAMENTO</Text>
        </View>
        <View style={styles.main}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:10 }}>
            <TouchableNativeFeedback onPress={() => this.setState({showEntrada: true})}>
              <View style={styles.button}>
                <Text style={styles.navbarText}>Entrada</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <EntradaCarro onCancel={() => this.setState({showEntrada: false})} isVisible={this.state.showEntrada} />

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
    flex: 11
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: commonStyles.colors.primary,
    shadowColor: '#171717',
    elevation: 15,
    width: 200,
    alignItems: 'center',
    marginTop:5
  }
})
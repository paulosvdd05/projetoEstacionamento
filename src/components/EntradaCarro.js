import React, { Component } from 'react'
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import commonStyles from '../commonStyles'

export default class EntradaCarro extends Component {
    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} animationType='fade' >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <Text style={styles.navbarText}>Entrada</Text>
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
        backgroundColor: '#FFF'
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: commonStyles.colors.primary,
        alignItems: 'center',
        height: 40,
        justifyContent:'center'	,
        alignItems:'center'
    },
    navbarText:{
        fontSize: 20,
        color: commonStyles.colors.secondary,
        fontWeight:'bold'
    }

})
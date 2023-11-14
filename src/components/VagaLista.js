import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles'


export default props => {
    return (
        <TouchableOpacity style={[styles.produto, { backgroundColor: props.index % 2 == 0 ? "#ffffff" : "#F2F2F2" }]} onPress={() => props.onSelect(props.id_produto)}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.index}>{props.index + 1}</Text>
            </View>
            <View>
                <Text style={styles.name}>{props.placa}</Text>
                <Text style={styles.desc}>{props.hora}</Text>

            </View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', marginRight: 10, flex:1}}>
                
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    produto: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    name: {
        color: commonStyles.colors.secondary,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    index: {
        color: commonStyles.colors.secondary,
        padding: 10,
        borderRightWidth: 1,
        borderColor: commonStyles.colors.secondary,
        marginRight: 10,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        color: commonStyles.colors.secondary,

    },
    valor: {
        color: commonStyles.colors.secondary,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    qntd: {
        color: commonStyles.colors.secondary,
        textAlign: 'right'
    }
})
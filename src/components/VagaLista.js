import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default props => {
    let horaEntrada = props.hora.split(":")[0]
    let minutoEntrada = props.hora.split(":")[1]
    return (
        <TouchableOpacity style={[styles.produto, { backgroundColor: props.index % 2 == 0 ? "#ffffff" : "#F2F2F2" }]} onPress={() => props.onSelect(props.id_produto)}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.index}>{props.index + 1}</Text>
            </View>
            <View style={{width:windowWidth/3.5}}>
                <View style={styles.placa}>
                    <Text style={styles.name}>{props.placa}</Text>
                </View>
            </View>
            <View style={styles.entrada}>
                <Text style={styles.desc}>Entrada:</Text>
                <Text style={styles.name}>{props.hora} Hrs</Text>
            </View>
            <TouchableOpacity onPress={() => props.delete(props.placa, horaEntrada, minutoEntrada)}>
                <View style={{paddingHorizontal:5, paddingVertical:10, borderRadius:5, backgroundColor:'#f00', marginRight:10}}>
                   <Icon name='exit-to-app' size={22} color='#fff'/>
                </View>
            </TouchableOpacity>

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
        color: commonStyles.colors.primary,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'right',
        alignItems:'flex-start',
        justifyContent:'flex-start'
      

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
    },
    entrada: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 10,
        width: windowWidth / 3.5,
        textAlign: 'left'

    },
    placa: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
        borderTopWidth: 8,
        borderColor: commonStyles.colors.secondary,
        backgroundColor:commonStyles.colors.primary,
        justifyContent:'center',
        alignItems:'center'
    }
})
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default props => {
    const renderizarLinha = (campo, titulo) => {
        if (campo != '') {
            return (<View style={styles.tabelaContainer}>
                <Text style={styles.name}>{titulo}</Text>
                <Text style={styles.name}>{campo}</Text>
            </View>)
        }
    }
    return (
        //<TouchableOpacity onPress={() => props.onSelect(props.id_venda)}>
        <View style={[styles.produto, { backgroundColor: props.index % 2 == 0 ? "#ffffff" : "#F2F2F2" }]}>
            <View style={{ backgroundColor: commonStyles.colors.primary, alignItems: 'center', padding: 5 }}>
                <View style={styles.placa}>
                    <Text style={styles.placaName}>{props.placa}</Text>
                </View>
            </View>

            <View style={{ justifyContent: 'space-around' }}>
                {renderizarLinha(props.horaEntrada, 'Hora Entrada:')}
                {renderizarLinha(props.horaSaida, 'Hora Saída:')}
                {renderizarLinha(('R$' + new Intl.NumberFormat('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 }).format(props.total)), 'Total')}

                <View style={{alignItems:'center', marginVertical:10}}>
                    <TouchableOpacity onPress={() => props.delete(props.placa, horaEntrada, minutoEntrada)}>
                        <View style={{ paddingHorizontal: 5, paddingVertical: 10, borderRadius: 5, backgroundColor: '#f00', justifyContent:'center', alignItems:'center', width:100}}>
                            {props.tipo != 'relatorio' ? <Icon name='exit-to-app' size={22} color='#fff' /> : <Icon name='delete' size={22} color='#fff' />}
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        //</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    produto: {
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: commonStyles.colors.primary,

    },
    name: {
        color: commonStyles.colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    desc: {
        color: commonStyles.colors.tertiary,

    },
    valor: {
        color: commonStyles.colors.tertiary,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    qntd: {
        color: commonStyles.colors.tertiary,
        textAlign: 'right'
    },
    tabelaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: commonStyles.colors.primary,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    placa: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
        borderTopWidth: 8,
        borderColor: commonStyles.colors.secondary,
        backgroundColor: commonStyles.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
    },
    placaName: {
        color: commonStyles.colors.secondary,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'right',
    },
})
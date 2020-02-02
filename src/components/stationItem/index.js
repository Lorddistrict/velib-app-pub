import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Dimensions,
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const StationItem = (props) => {

    return (
        <TouchableOpacity
            onPress={() => {
                props.navigation.navigate('StationDetails', {
                    stationData: props.station
                })
            }}
            style={styles.container}
        >

            <Text style={{fontSize: 11, paddingLeft: 5}}>
                <Ionicons name='md-compass' size={11} color='#000000' />&nbsp;
                {props.station.fields.station_name}
            </Text>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Text style={styles.meters}>
                    {Math.ceil(props.station.fields.dist)}m
                </Text>

                <View>

                    <View style={styles.line}>
                        <View style={styles.nb}>
                            <Text style={styles.bicycle}>
                                {props.station.fields.nbbike}&nbsp;
                            </Text>
                        </View>
                        <Ionicons name='md-bicycle' size={25} color='#CCCCCC' />
                    </View>

                    <View style={styles.line}>
                        <View style={styles.nb}>
                            <Text style={styles.ebicycle}>
                                {props.station.fields.nbebike}&nbsp;
                            </Text>
                        </View>
                        <Ionicons name='md-bicycle' size={25} color='#efe200' />
                        <Text>&nbsp;</Text>
                        <Ionicons name='md-flash' size={25} color='#efe200' />
                    </View>

                </View>
            </View>

        </TouchableOpacity>
    );
};

export default StationItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').width / 2,
        marginHorizontal: 5,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    meters: {
        color: 'steelblue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    line: {
        flexDirection: 'row',
    },
    nb: {
        width: 30,
    },
    bicycle: {
        color: '#CCCCCC',
        fontWeight: 'bold',
        fontSize: 20,
    },
    ebicycle: {
        color: '#efe200',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

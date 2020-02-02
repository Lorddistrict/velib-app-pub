import React, {useState, useEffect, useContext} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
} from 'react-native';
import StationItem from "../../components/stationItem";
import {VelibContext} from "../../store/context";

const VelibScreen = ({navigation}) => {

    const data = useContext(VelibContext);

    const stations = data.stations.records;

    const nbColumns = 2;

    return (
        <View style={styles.container}>
            <FlatList
                data={stations}
                renderItem={({item}) =>
                    <StationItem
                        station={item}
                        navigation={navigation}
                        nbColumns={nbColumns}
                    />
                }
                keyExtractor={item => item.recordid}
                numColumns={nbColumns}
                style={styles.list}
            />
        </View>
    )
};

export default VelibScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        width: '95%',
        marginVertical: 20,
    },
});

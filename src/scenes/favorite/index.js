import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, AsyncStorage} from 'react-native';
import StationItem from "../../components/stationItem";
import {VelibContext} from "../../store/context";

const FavoriteScreen = ({navigation}) => {

    const [stations, setStations] = useState([]);

    const data = useContext(VelibContext);

    const nbColumns = 2;
    const contextStations = data.stations.records;
    const array = [];

    useEffect(() => {
        navigation.addListener('willFocus', () => {
            setStations([]);
            getAsyncStorageData();
        });
    });

    const getAsyncStorageData = async () => {

        const favoriteStations = JSON.parse(await AsyncStorage.getItem('favorites'));

        if (favoriteStations !== null) {
            contextStations.map((contextData) => {
                favoriteStations.map((favoriteData) => {
                    if (contextData.recordid === favoriteData.id) {
                        array.push(contextData);
                    }
                })
            });
            setStations(array);
        }
    };

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

export default FavoriteScreen;

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
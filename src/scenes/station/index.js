import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { Divider } from 'react-native-elements';
import Moment from 'moment';
import FavoriteStar from "../../components/favorite";

const StationScreen = ({navigation}) => {

    const [ creditCard, setCreditCard ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ favorite, setFavorite ] = useState(false);

    const station = navigation.getParam('stationData');
    const latitude = station.fields.geo[0];
    const longitude = station.fields.geo[1];

    useEffect(() => {
        if (station.fields.creditcard === 'yes') {
            setCreditCard(true);
        }

        isFavorite(station.recordid);
        setTitle(reformatTitle());
        navigation.setParams(title);

    },[]);

    Moment.locale('fr');

    StationScreen.navigationOptions = () => ({
        title,
        headerRight: () => (
            <FavoriteStar
                onPress={ () => addFavoriteKey(station.recordid) }
                // onPress={ () => clearAsyncStorage() }
                favorite={favorite}
            />
        )
    });

    const reformatTitle = () => {

        if (station.fields.station_name.length > 27) {
            return station.fields.station_name.substring(0, 27) + '...';
        }

        return station.fields.station_name;
    };

    const addFavoriteKey = async (key) => {

        // Storage stations
        const favorites = await AsyncStorage.getItem('favorites');

        // current station
        let station = {
            'id': key,
        };

        // Rebuild favorites
        let newFavorites = [];

        // If I have some favorites stored
        if (favorites !== null) {

            let asyncStorageData = JSON.parse(favorites);

            asyncStorageData.map((data) => {

                if (data.id !== key) {
                    newFavorites.push(asyncStorageData[0]);
                    newFavorites.push(station);

                    setFavorite(true);
                } else {
                    newFavorites = newFavorites.filter((favorite) => {
                        return favorite.id !== key;
                    });

                    setFavorite(false);
                }
            });
        } else {
            setFavorite(true);
            newFavorites.push(station);
        }

        if (newFavorites.length === 0) {
            await AsyncStorage.removeItem('favorites');
        } else {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        }

        updateHeaderFavorite();

        const debug = JSON.parse(await AsyncStorage.getItem('favorites'));
    };

    const isFavorite = async (key) => {

        let favorites = await AsyncStorage.getItem('favorites');

        if (favorites !== null) {
            let asyncStorageData = JSON.parse(favorites);

            asyncStorageData.map((data) => {
                if (data.id === key) {
                    setFavorite(true);
                }
            });
            updateHeaderFavorite();
        }
    };

    const updateHeaderFavorite = () => {
        let headerRight = () => (
            <FavoriteStar
                onPress={ () => addFavoriteKey(station.recordid) }
                favorite={favorite}
            />
        );
        navigation.setParams(headerRight);
    };

    const clearAsyncStorage = async () => {
        AsyncStorage.clear();
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                showsUserLocation = {true}
                followUserLocation = {true}
                showsMyLocationButton={true}
                zoomEnabled = {true}
                showsCompass={true}
                toolbarEnabled={true}
                rotateEnabled={true}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                    title={station.fields.station_name}
                />
            </MapView>
            <View style={styles.dataContainer}>

                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name='md-walk' size={25} color='#000000' />
                    </View>
                    <Text style={styles.label}>
                        Distance: {Math.ceil(station.fields.dist)}m
                    </Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name='md-bicycle' size={25} color='#000000' />
                    </View>
                    <Text style={styles.label}>
                        {station.fields.nbbike} vélo disponible(s)
                    </Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name='md-flash' size={25} color='#000000' />
                    </View>
                    <Text style={styles.label}>
                        {station.fields.nbebike} vélo(s) électrique(s) disponible(s)
                    </Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name='md-card' size={25} color='#000000' />
                    </View>
                    <Text style={styles.label}>
                        Achat de ticket
                    </Text>
                    <View style={styles.creditcard}>
                        {creditCard
                            ?
                            <Ionicons name='md-checkmark' size={25} color='#0A9C00' />
                            :
                            <Ionicons name='md-close' size={25} color='#F00000' />
                        }
                    </View>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.row}>
                    <View style={styles.iconBox}>
                        <Ionicons name='md-time' size={25} color='#000000' />
                    </View>
                    <Text style={styles.label}>
                        Mise à jour à {Moment(station.record_timestamp).format('HH:mm')}
                    </Text>
                </View>
                <Divider style={styles.divider} />

            </View>
        </View>
    )
};

export default StationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    map: {
        width: Dimensions.get('window').width,
        height: '60%',
        shadowOffset:{  width: 0,  height: 10,  },
        shadowColor: '#000000',
        shadowOpacity: 0.5,
    },
    dataContainer: {
        flex: 1,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: 'steelblue',
    },
    iconBox: {
        flex: 1,
        alignItems: 'center',
        maxWidth: 30,
    },
    label: {
        lineHeight: 25,
        marginLeft: 20,
    },
    creditcard: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
    },
    divider: {
        backgroundColor: '#000000',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
    },
});
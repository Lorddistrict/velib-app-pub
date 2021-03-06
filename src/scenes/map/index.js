import React, {useContext} from 'react';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView
} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import {VelibContext} from "../../store/context";

const MapScreen = () => {

    const data = useContext(VelibContext);
    const stations = data.stations.records;

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                region={ data.localisation && {
                    latitude: data.localisation.latitude,
                    longitude: data.localisation.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.015,
                }}
                showsUserLocation={true}
                followUserLocation={true}
                showsMyLocationButton={true}
                zoomEnabled={true}
                showsCompass={true}
                toolbarEnabled={true}
                rotateEnabled={true}
            >
                {
                    stations && stations.map((item, index) =>
                        <Marker
                            title={item.fields.station_name}
                            coordinate={{
                                latitude: item.fields.geo[0],
                                longitude: item.fields.geo[1],
                            }}
                            key={index}
                        />
                    )
                }
            </MapView>
        </SafeAreaView>
    )
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 52,
        backgroundColor: 'steelblue',
    },
    map: {
        height: Dimensions.get('window').height,
    },
});
import React, {useState, useEffect} from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
} from 'react-native';
import { getVelibs } from "../../services/api";
import StationItem from "../../components/stationItem";
import {getLocation} from "../../services/location";

const VelibScreen = ({navigation}) => {

    const [loading, setLoading] = useState(true);
    const [velibs, setVelibs] = useState();

    const nbColumns = 2;

    useEffect(() => {
        getAPIData();
    }, []);

    const getAPIData = async () => {
        setLoading(true);
        const location = await getLocation();
        const velibsData = await getVelibs(location.coords.latitude, location.coords.longitude);
        setVelibs(velibsData);
        setLoading(false);

    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="steelblue"/>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={velibs}
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    list: {
        flex: 1,
        width: '95%',
        marginVertical: 20,
    },
});

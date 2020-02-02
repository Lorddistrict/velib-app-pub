import React from 'react';
import Navigator from './navigations/index';
import {StyleSheet, View} from 'react-native';
import VelibProvider from "./store/context";

const App = () => {

    return (
        <View style={styles.container}>
            <VelibProvider>
                <Navigator/>
            </VelibProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default App;
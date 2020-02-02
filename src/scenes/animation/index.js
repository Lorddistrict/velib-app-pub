import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated
} from 'react-native';

const AnimationScreen = () => {

    const [flex] = useState(new Animated.Value(1));

    useEffect(() => {
        animateMyView();
    });

    const animateMyView = () => {
        Animated.timing(flex, {
            toValue: 0.075,
            duration: 2000
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{ backgroundColor: 'steelblue', flex: flex, }}>

            </Animated.View>
            <Animated.View style={{ backgroundColor: '#FFFFFF', flex: 1, }}>

            </Animated.View>
        </View>
    )
};

export default AnimationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
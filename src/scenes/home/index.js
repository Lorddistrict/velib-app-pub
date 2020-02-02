import React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const HomeScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                source={require('./../../../assets/velo.jpg')}
                resizeMode='cover'
            />
            <View style={styles.titleBox}>
                <Text style={styles.title}>V</Text>
                <Text style={styles.title}>E</Text>
                <Text style={styles.title}>L</Text>
                <Text style={styles.title}>I</Text>
                <Text style={styles.title}>B</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {navigation.navigate('Velibs')}}
                >
                    <Text style={styles.buttonText}>
                        Let's&nbsp;
                        <Ionicons name='md-bicycle' size={25} color='#FFFFFF' />&nbsp;!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070551',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    titleBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 40,
    },
    button: {
        marginTop: 30,
        backgroundColor: 'skyblue',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
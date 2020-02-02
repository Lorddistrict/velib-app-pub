import React from "react";
import {
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const FavoriteStar = (props) => {
    return (
        <TouchableOpacity
            title="Add as favorite"
            color="#FFFFFF"
            style={styles.container}
            onPress={props.onPress}
        >
            {props.favorite
                ?
                <Ionicons name='md-star' size={30} color='gold' />
                :
                <Ionicons name='md-star-outline' size={30} color='gold' />
            }
        </TouchableOpacity>
    )
};

export default FavoriteStar;

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
});
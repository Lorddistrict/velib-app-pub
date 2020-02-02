import React from 'react';
import {
    AsyncStorage,
} from 'react-native';

export async function getVelibs(latitude, longitude)
{
    return fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&geofilter.distance=${latitude},${longitude},1000`)
        .then(response => response.json())
        .then(async (response) => {
            await AsyncStorage.setItem('records', JSON.stringify(response.records));
            return response.records;
        })
        .catch(async error => {
            console.log(error);
            return await JSON.parse(AsyncStorage.getItem('records'));
        });
}
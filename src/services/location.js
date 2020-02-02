import React from 'react';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export async function getLocation()
{
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
        console.log('PERMISSION NOT GRANTED');

        return error = 'PERMISSION NOT GRANTED';
    }

    return Location.getCurrentPositionAsync();
}
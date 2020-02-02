import React, {useState, createContext, useEffect} from 'react';
import {getLocation} from "../services/location";

export const VelibContext = createContext(null);

export const VelibProvider = ({ children }) => {

    const [velibs, setVelibs] = useState([]);
    const [localisation, setLocalisation] = useState({});

    useEffect(() => {
        getVelibs();
    }, []);

    const getVelibs = async () => {

        const location = await getLocation();

        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        setLocalisation({
            'latitude': latitude,
            'longitude': longitude
        });

        const range = 1000;
        const API = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&geofilter.distance=${latitude},${longitude},${range}`;

        fetch(API)
            .then(response => response.json())
            .then(data => setVelibs(data))
    };

    return (
        <VelibContext.Provider value={{ velibs, localisation }}>
            { children }
        </VelibContext.Provider>
    );
};

export default VelibProvider;
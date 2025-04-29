import React, { createContext, useContext, useState } from 'react';

const PredictContext = createContext();

export const useForecastModal = () => useContext(PredictContext);

export const ForecastModalProvider = ({ children }) => {
    const [isForecastOpen, setIsForecastOpen] = useState(false);

    const openForecast = () => setIsForecastOpen(true);
    const closeForecast = () => setIsForecastOpen(false);

    return (
        <PredictContext.Provider value={{ isForecastOpen, openForecast, closeForecast }}>
            {children}
        </PredictContext.Provider>
    );
};

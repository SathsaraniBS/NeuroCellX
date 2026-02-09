import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
    const addToast = (message, type = 'info') => {
        console.log(`Toast (${type}): ${message}`);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
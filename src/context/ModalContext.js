"use client";

import { set } from "mongoose";
import { createContext, useContext, useState} from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [activeModal, setActiveModal] = useState(null);
    const [modalProps, setModalProps] = useState({});

    const openModal = (modalType, props = {}) => {
        setActiveModal(modalType);
        setModalProps(props);
    }

    const closeModal = () => {
        setActiveModal(null);
        setModalProps({});
    };

    const value = {
        activeModal,
        modalProps,
        openModal,
        closeModal,
        openSettings: (props) => openModal('settings', props),
        openTheme: () => openModal('theme'),
        openSessionComplete: () => openModal('sessionComplete'),
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

// Modal type constants
export const MODAL_TYPES = {
    SETTINGS: 'settings',
    THEME: 'theme',
    SESSION_COMPLETE: 'sessionComplete',
};
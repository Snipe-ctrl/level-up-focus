"use client";

import { useModal, MODAL_TYPES } from "@/context/ModalContext";

import SettingsModal from "./SettingsModal";
import ThemeModal from "./ThemeModal";
import SessionCompleteModal from "./SessionCompleteModal";

export default function GlobalModalRenderer() {
    const { activeModal, modalProps, closeModal } = useModal();

    if (!activeModal) return null;

    const renderModal = () => {
        switch (activeModal) {
            case MODAL_TYPES.SETTINGS:
                return (
                    <SettingsModal
                        isOpen={true}
                        onClose={closeModal}
                        onSave={modalProps.onSave}
                        settings={modalProps.settings}
                    />
                );
            case MODAL_TYPES.THEME:
                return (
                    <ThemeModal
                        isOpen={true}
                        onClose={closeModal}
                    />
                );
            case MODAL_TYPES.SESSION_COMPLETE:
                return (
                    <SessionCompleteModal
                        isOpen={true}
                        onClose={closeModal}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Backdrop overlay */}
            <div 
                className="fixed inset-0 bg-black/60 z-20"
                onClick={closeModal}
            />
            {/* Modal container */}
            <div className="modal-portal">
                {renderModal()}
            </div>
        </>
    );
}
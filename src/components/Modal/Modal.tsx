import cls from "./Modal.module.css";
import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={cls.modalOverlay} onClick={onClose}>
            <div
                className={cls.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={cls.modalClose} onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

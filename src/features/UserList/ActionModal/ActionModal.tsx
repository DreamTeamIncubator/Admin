import {ModalRadix} from '@/components/Modal/ModalRadix.tsx';
import {Button} from '@/components/Button/Button.tsx';
import React from 'react';
import s from './ActionModal.module.scss';

type ModalContent = {
    title: string
    description: React.ReactNode
    formFields?: React.ReactNode
};

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    content: ModalContent
    isLoading?: boolean
};

export const ActionModal = (
    {
        isOpen,
        onClose,
        onConfirm,
        content,
        isLoading = false
    }: Props) => {

    return (
        <ModalRadix open={isOpen} onClose={onClose} modalTitle={content.title}>
            <div className={s.description}>{content.description}</div>
            {content.formFields}
            <div className={s.buttonContainer}>
                <Button
                    variant="primary"
                    onClick={onClose}
                    disabled={isLoading}
                >No
                </Button>
                <Button
                    variant="outlined"
                    onClick={onConfirm}
                    disabled={isLoading}
                >Yes
                </Button>
            </div>
        </ModalRadix>
    );
};

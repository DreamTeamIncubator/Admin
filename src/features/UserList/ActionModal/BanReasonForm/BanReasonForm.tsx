import { useState, useEffect } from 'react';
import { RadixSelect } from '@/components/Select/RadixSelect.tsx';
import { TextArea } from '@/components/Textarea/TextArea.tsx';
import s from './BanReasonForm.module.scss';
import {useTranslation} from 'react-i18next';

type Props = {
    reason: string;
    onReasonChange: (value: string) => void;
    customReason: string;
    onCustomReasonChange: (value: string) => void;
}

export const BanReasonForm = (
    {
        reason,
        onReasonChange,
        customReason,
        onCustomReasonChange
    }: Props) => {

    const [showCustomReason, setShowCustomReason] = useState(reason === 'Another reason');
    const { t } = useTranslation();

    const banReasons = [
        { value: 'Bad behavior', label: t('usersList.modal.ban.reasonSelect.options.behavior') },
        { value: 'Advertising placement', label: t('usersList.modal.ban.reasonSelect.options.advertising') },
        { value: 'Another reason', label: t('usersList.modal.ban.reasonSelect.options.another') },
    ];


    useEffect(() => {
        setShowCustomReason(reason === 'Another reason');
    }, [reason]);

    const reasonChangeHandler = (value: string) => {
        onReasonChange(value);
    };

    return (
        <>
            <div className={s.selectContainer}>
                <RadixSelect
                    className={s.select}
                    contentClassName={s.selectContent}
                    itemClassName={s.selectItem}
                    options={banReasons}
                    onValueChange={reasonChangeHandler}
                    value={reason}
                    placeholder={t('usersList.modal.ban.reasonSelect.placeholder')}
                />
            </div>
            <div className={`${s['textarea-animator']} ${showCustomReason ? s.visible : ''}`}>
                {showCustomReason && (
                    <TextArea
                        value={customReason}
                        onChange={(e) => onCustomReasonChange(e.currentTarget.value)}
                        className={s.textarea}
                        placeholder={t('usersList.modal.ban.textarea.placeholder')}
                    />
                )}
            </div>
        </>
    );
};

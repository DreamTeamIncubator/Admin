import flagRussian from '@/assets/languages/flagRussian.svg'
import flagUK from '@/assets/languages/flagUK.svg'
import s from './LanguageSelect.module.scss';
import {useState} from 'react';
import {RadixSelect} from '../RadixSelect';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';


export const LanguageSelect = () => {
    const [open, setOpen] = useState(false);
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const options = [
        {value: 'en', label: t('languageSelect.en'), icon: flagUK},
        {value: 'ru', label: t('languageSelect.ru'), icon: flagRussian},
    ];

    const currentLanguage = options.find(
        option => option.value === location.pathname.split('/')[1]
    ) || options[0];

    const handleValueChange = (value: string) => {
        const selectedOption = options.find(option => option.value === value);
        if (!selectedOption) return;

        setOpen(false);
        i18n.changeLanguage(value);

        // Получаем текущий путь без языкового префикса
        const currentPath = window.location.pathname
            .replace(/^\/(en|ru)(\/|$)/, '/') // Удаляем языковой префикс
            .replace(/\/$/, ''); // Удаляем trailing slash

        // Формируем новый путь
        const newPath = value === 'en'
            ? currentPath || '/'
            : `/${value}${currentPath}`;

        navigate(newPath, { replace: true });
    };

    return (
        <div className={s.selectedContainer}>
            <RadixSelect
                options={options}
                onValueChange={handleValueChange}
                className={s.languageSelect}
                value={currentLanguage.value}
                renderValue={(option) => (
                    <div className={s.selectedValue}>
                        {option.icon && (
                            <img
                                src={option.icon}
                                alt={`${option.label} flag`}
                                width={24}
                                height={24}
                                className={s.FlagIcon}
                            />
                        )}
                        <span>{option.label}</span>
                    </div>
                )}
                renderItem={(option) => (
                    <div className={s.itemContent}>
                        {option.icon && (
                            <img
                                src={option.icon}
                                alt={`${option.label} flag`}
                                width={24}
                                height={24}
                                className={s.FlagIcon}
                            />
                        )}
                        <span>{option.label}</span>
                    </div>
                )}
            />
        </div>
    );
};
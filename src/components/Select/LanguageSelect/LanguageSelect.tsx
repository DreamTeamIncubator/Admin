import flagRussian from '@/assets/languages/flagRussian.svg'
import flagUK from '@/assets/languages/flagUK.svg'
import s from './LanguageSelect.module.scss';
import { useState } from 'react';
import { RadixSelect } from '../RadixSelect';

const options = [
  { value: 'Russian', label: 'Russian', icon: flagRussian },
  { value: 'English', label: 'English', icon: flagUK },
];

export const LanguageSelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(options[1]); 
  
  const handleValueChange = (value: string) => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setSelectedLanguage(selectedOption);
      setOpen(false);
    }
  };

  return (
    <div className={s.selectedContainer}>
      <RadixSelect 
        options={options}
        onValueChange={handleValueChange}
        className={s.languageSelect}
        value={selectedLanguage.value} 
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

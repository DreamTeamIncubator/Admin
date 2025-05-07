import s from './Header.module.scss'
import {Button} from '../Button/Button.tsx';
import {LanguageSelect} from '../Select/LanguageSelect/LanguageSelect.tsx';
import { Link } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export const Header = () => {

  const { t } = useTranslation();
  // const { data } = useGetMeQuery()
  // const SignUpForm = () => {
  //   redirect('/auth/sign-up')
  // }

  return (
    <div className={s.header}>
      <div className={s.content}>
        <h2 className={s.text}>
          <span>Inctagram</span>
          <span>Super</span>
          <span>Admin</span>
        </h2>
        <div className={s.navigate}>
          <LanguageSelect />
          {/*{data ? null : (*/}
            <div>
              <Link to="/login">
                <Button variant={'textButton'} className={s.btn}>
                  {t('common.button.signUp')}
                </Button>
              </Link>
                {/*onClick={SignUpForm}*/}
              <Button variant={'primary'} className={s.btn} >
                {t('common.button.login')}
              </Button>
            </div>
          {/*)}*/}
        </div>
      </div>
    </div>
  )
}

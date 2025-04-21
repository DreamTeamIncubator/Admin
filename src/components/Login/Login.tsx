import {useLocation, useNavigate} from 'react-router-dom'
import s from './Login.module.scss'
import {Button} from '../Button/Button'
import {Input} from '../Input/Input'

export const Login = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async () => {
        localStorage.setItem('isLogged', 'true');
        navigate(from, { replace: true });
    }



    return (
        <div className={s.container}>
            <div className={s.formContainer}>
                <span className={s.title}>Sign In</span>

                <div className={s.formGroup}>
                    <label className={s.label}>Email</label>
                    <Input
                        placeholder="admin@gmail.com"
                        className={s.input}
                    />
                </div>

                <div className={s.formGroup}>
                    <label className={s.label}>Password</label>
                    <div className={s.passwordContainer}>
                        <Input
                            className={s.input}
                            placeholder="******************"
                        />
                        <img src={'/eyeIcon.svg'} className={s.eyeIcon} alt={'icon'}/>
                    </div>
                </div>

                <Button onClick={handleLogin} variant="primary" className={s.btn}>
                    Sign In
                </Button>
            </div>
        </div>
    )
} 
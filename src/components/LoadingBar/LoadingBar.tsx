import * as Progress from '@radix-ui/react-progress';
import s from './LoadingBar.module.scss';

export const LoadingBar = () => {
    return (
        <Progress.Root className={s.progressRoot} value={100}>
            <Progress.Indicator className={s.progressIndicator} />
        </Progress.Root>
    );
};

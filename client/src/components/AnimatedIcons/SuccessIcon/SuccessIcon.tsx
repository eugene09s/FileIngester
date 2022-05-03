import { FC } from 'react';
import { IconProps } from '../types';
import styles from './SuccessIcon.module.scss';

const SuccessIcon: FC<IconProps> = (props) => {
    return (
        <div style={{ width: props.width, height: props.height }}>
            <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" />
                <path className={styles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        </div>
    );
};

export default SuccessIcon;

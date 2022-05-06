import { FC } from 'react';
import { IconProps } from '../types';
import styles from './ErrorIcon.module.scss';
import c from 'classnames';

const ErrorIcon: FC<IconProps> = (props) => {
    return (
        <div style={{ width: props.width, height: props.height }}>
            <svg className={styles.cross__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className={styles.cross__circle} cx="26" cy="26" r="25" fill="none" />
                <path className={c(styles.cross__path, styles.cross__path_right)} fill="none" d="M16,16 l20,20" />
                <path className={c(styles.cross__path, styles.cross__path_right)} fill="none" d="M16,36 l20,-20" />
            </svg>
        </div>
    );
};

export default ErrorIcon;

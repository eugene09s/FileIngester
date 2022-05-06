import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './CustomCSSTransition.module.scss';

interface Props {
    show: boolean;
    timeout?: number;
    onlyExit?: boolean;
}

const CustomCSSTransition: FC<Props> = (props) => {
    return (
        <CSSTransition
            in={props.show}
            timeout={props.timeout!}
            classNames={
                props.onlyExit
                    ? {
                        exit: styles.animationExit,
                        exitActive: styles.animationExitActive,
                    }
                    : {
                        enter: styles.animationEnter,
                        enterActive: styles.animationEnterActive,
                        exit: styles.animationExit,
                        exitActive: styles.animationExitActive,
                    }
            }
            unmountOnExit
        >
            {/* {React.isValidElement(props.children) ? React.cloneElement(props.children, { position: 'relative' }) : null} */}
            {props.children}
        </CSSTransition>
    );
};

CustomCSSTransition.defaultProps = {
    timeout: 600,
};

export default CustomCSSTransition;

import { FC } from 'react';
import styles from './UploadStatus.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from 'context/RootStoreContext';
import { CSSTransition } from 'react-transition-group';
import c from 'classnames';
import ProgressUpload from './ProgressUpload';
import { UploadStatuses } from 'stores/FilesStore';
import CompletedUpload from './CompletedUpload';
import { Paper } from '@mui/material';
import CustomCSSTransition from '@components/CustomCSSTransition';

interface Props {
    className?: string;
}

const UploadStatus: FC<Props> = (props) => {
    const { filesStore } = useStore();

    return (
        <CustomCSSTransition show={filesStore.status !== UploadStatuses.NO_FILE}>
            <Paper variant="outlined" className={c(styles.paper, props.className)}>
                <CustomCSSTransition show={filesStore.status === UploadStatuses.UPLOADING} onlyExit>
                    <ProgressUpload />
                </CustomCSSTransition>
                <CustomCSSTransition show={filesStore.status === UploadStatuses.UPLOADED || filesStore.status === UploadStatuses.ERROR}>
                    <CompletedUpload />
                </CustomCSSTransition>
            </Paper>
        </CustomCSSTransition>
    );
};

export default observer(UploadStatus);

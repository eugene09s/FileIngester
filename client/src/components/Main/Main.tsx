import FileUploadSection from '@components/FileUploadSection';
import { Container } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import styles from './Main.module.scss';
import c from 'classnames';
import UploadStatus from '@components/UploadStatus';

const Main: FC = () => {
    const { filesStore } = useStore();
    const fileAttached = filesStore.file !== null;

    return (
        <div className={styles.main}>
            <Container className={c(styles.container, { [styles.fileAttached]: fileAttached })} maxWidth="md">
                <FileUploadSection />
                <UploadStatus className={styles.uploadStatus} />
            </Container>
        </div>
    );
};

export default observer(Main);

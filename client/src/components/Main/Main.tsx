import FileUploadSection from '@components/FileUploadSection';
import { Container, Grid, Typography } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import styles from './Main.module.scss';
import c from 'classnames';
import UploadStatus from '@components/UploadStatus';
import FileDownloadLink from '@components/FIleDownloadLink';
import { UploadStatuses } from 'stores/FilesStore';

const Main: FC = () => {
    const { filesStore } = useStore();
    const fileAttached = filesStore.status !== UploadStatuses.NO_FILE;
    const fileUploaded = filesStore.status === UploadStatuses.UPLOADED;
    const uploadError = filesStore.status === UploadStatuses.ERROR;

    return (
        <div className={styles.main}>
            <Container maxWidth="md" className={styles.container}>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography component="h1" variant="h3" fontWeight="500">
                            File Ingester
                        </Typography>
                    </Grid>
                    <Grid item className={c(styles.fileUploadContainer, { [styles.fileAttached]: fileAttached })}>
                        <FileUploadSection />
                        <UploadStatus className={styles.uploadStatus} />
                    </Grid>
                    {(fileUploaded || uploadError) && (
                        <Grid item>
                            <FileDownloadLink className={styles.downloadLink} error={uploadError} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default observer(Main);

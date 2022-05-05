import { Grid, LinearProgress, Typography } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { FC } from 'react';
import getFormattedFileSize from 'utils/getFormattedFileSize';
import styles from './ProgressUpload.module.scss';
import parentStyles from '../UploadStatus.module.scss';
import { observer } from 'mobx-react-lite';

const ProgressUpload: FC = () => {
    const { filesStore } = useStore();

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Typography component="p" variant="h6">
                    Загрузка...
                </Typography>
            </Grid>
            {filesStore.file !== null && (
                <Grid item container justifyContent="space-between">
                    <Typography component="p" color="GrayText" className={parentStyles.fileName} title={filesStore.file.name}>
                        {filesStore.file.name}
                    </Typography>
                    <Typography component="p" color="GrayText">
                        {getFormattedFileSize(filesStore.file.size)}
                    </Typography>
                </Grid>
            )}
            <Grid item container alignItems="center" justifyContent="space-between">
                <LinearProgress variant="determinate" value={filesStore.uploadProgress} className={styles.progress} />
                <Typography component="p" color="GrayText" className={styles.progressLabel}>
                    {filesStore.uploadProgress}%
                </Typography>
            </Grid>
        </Grid>
    );
};

export default observer(ProgressUpload);

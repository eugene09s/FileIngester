import { Grid, LinearProgress, Typography } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { FC } from 'react';
import getFormattedFileSize from 'utils/getFormattedFileSize';
import useFilesHandler from '../hooks/useFilesHandler';
import styles from './ProgressUpload.module.scss';
import parentStyles from '../UploadStatus.module.scss';

const ProgressUpload: FC = () => {
    const { progress } = useFilesHandler();
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
                <LinearProgress variant="determinate" value={progress} className={styles.progress} />
                <Typography component="p" color="GrayText" className={styles.progressLabel}>
                    {progress}%
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ProgressUpload;

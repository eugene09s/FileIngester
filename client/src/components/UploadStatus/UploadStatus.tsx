import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import styles from './UploadStatus.module.scss';
import c from 'classnames';
import { observer } from 'mobx-react-lite';
import useFilesHandler from './hooks/useFilesHandler';
import { CSSTransition } from 'react-transition-group';
import { useStore } from 'context/RootStoreContext';
import getFormattedFileSize from 'utils/getFormattedFileSize';

interface Props {
    className?: string;
}

const UploadStatus: FC<Props> = (props) => {
    const { progress } = useFilesHandler();
    const { filesStore } = useStore();

    return (
        <CSSTransition
            in={filesStore.file !== null}
            timeout={600}
            classNames={{
                enter: styles.animationEnter,
                enterActive: styles.animationEnterActive,
                exit: styles.animationExit,
                exitActive: styles.animationExitActive,
            }}
            unmountOnExit
        >
            <Paper variant="outlined" className={c(styles.paper, props.className)}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography component="p" variant="h6">
                            Загрузка...
                        </Typography>
                    </Grid>
                    {filesStore.file !== null && (
                        <Grid item container justifyContent="space-between">
                            <Typography component="p" color="GrayText" className={styles.fileName} title={filesStore.file.name}>
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
            </Paper>
        </CSSTransition>
    );
};

export default observer(UploadStatus);

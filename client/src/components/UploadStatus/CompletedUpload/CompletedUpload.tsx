import ErrorIcon from '@components/AnimatedIcons/ErrorIcon';
import { IconProps } from '@components/AnimatedIcons/types';
import { Grid, Typography } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { FC } from 'react';
import { UploadStatuses } from 'stores/FilesStore';
import SuccessIcon from '../../AnimatedIcons/SuccessIcon';
import parentStyles from '../UploadStatus.module.scss';

const CompletedUpload: FC = () => {
    const { filesStore } = useStore();
    const isError = filesStore.status === UploadStatuses.ERROR;
    const iconProps: IconProps = { width: 30, height: 30 };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid container item direction="column" spacing={1} width="auto">
                <Grid item>
                    <Typography component="p" variant="h6">
                        {isError ? 'Произошла ошибка, файл не был загружен' : 'Файл успешно загружен'}
                    </Typography>
                </Grid>
                {filesStore.file !== null && (
                    <Grid item container justifyContent="space-between">
                        <Typography component="p" color="GrayText" className={parentStyles.fileName} title={filesStore.file.name}>
                            {filesStore.file.name}
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Grid item>{isError ? <ErrorIcon {...iconProps} /> : <SuccessIcon {...iconProps} />}</Grid>
        </Grid>
    );
};

export default CompletedUpload;

import { Button, Grid, Link, Typography } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { UploadStatuses } from 'stores/FilesStore';
import styles from './FileDownloadLink.module.scss';

interface Props {
    className?: string;
    error?: boolean;
}

const FileDownloadLink: FC<Props> = (props) => {
    const { filesStore } = useStore();
    const link = `${window.location.origin}/file/${filesStore.uploadedFileId}`;

    const uploadMore = useCallback(() => {
        filesStore.setStatus(UploadStatuses.NO_FILE);
    }, [filesStore]);

    if (props.error) {
        return (
            <Grid container className={props.className} justifyContent="center">
                <Grid item>
                    <Button onClick={uploadMore} variant="contained">
                        Повторить попытку
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container direction="column" alignItems="center" className={props.className} spacing={1}>
            <Grid item>
                <Typography variant="h6" component="p">
                    Ссылка на скачивание файла
                </Typography>
            </Grid>
            <Grid item>
                <Link href={link} target="_blank">
                    {link}
                </Link>
            </Grid>
            <Grid item>
                <Button className={styles.uploadMore} variant="contained" onClick={uploadMore}>
                    Загрузить еще
                </Button>
            </Grid>
        </Grid>
    );
};

export default observer(FileDownloadLink);

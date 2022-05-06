import { Button, Grid, Link, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useDownloadLink from './hooks/useDownloadLink';
import styles from './FileDownloadLink.module.scss';

interface Props {
    className?: string;
    error?: boolean;
}

const FileDownloadLink: FC<Props> = (props) => {
    const { link, linkCopied, uploadMore, copyLink } = useDownloadLink();

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
            <Grid container item direction="column" alignItems="center" spacing={2} mt={0.5}>
                <Grid item width="100%">
                    <Button variant="contained" onClick={copyLink} color={linkCopied ? 'success' : undefined} className={styles.btn}>
                        {linkCopied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
                    </Button>
                </Grid>
                <Grid item width="100%">
                    <Button variant="contained" onClick={uploadMore} className={styles.btn}>
                        Загрузить еще
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default observer(FileDownloadLink);

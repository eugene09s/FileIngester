import { Alert, Button, CircularProgress, Container, Grid, Snackbar, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import styles from './DownloadInfo.module.scss';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import HighlightIcon from '@mui/icons-material/Highlight';
import List from '@mui/material/List';
import getFormattedFileSize from '../../../utils/getFormattedFileSize';
import { AccountBalance, DateRange, HourglassTop, Badge } from '@mui/icons-material';
import useDownload from './hooks/useDownload';

const DownloadInfo: FC = () => {
    const { loading, fileInfo, fileId, error } = useDownload();

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" className={styles.main}>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        );
    }

    return (
        <div className={styles.main}>
            <Container maxWidth="md" className={styles.container}>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography component="h1" variant="h3" fontWeight="500">
                            File Ingester
                        </Typography>
                    </Grid>

                    {fileInfo === null ? (
                        <Alert severity="error" className={styles.errorAlert}>
                            <Typography variant="h6" fontWeight="400">
                                {error}
                            </Typography>
                        </Alert>
                    ) : (
                        <>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '20px 0' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Badge />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Name" secondary={fileInfo.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <HighlightIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Size" secondary={getFormattedFileSize(fileInfo.size)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountBalance />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Count Download" secondary={fileInfo.downloads} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DateRange />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Date upload" secondary={fileInfo.uploadDate} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <HourglassTop />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Expired date" secondary={fileInfo.deleteDate} />
                                </ListItem>
                            </List>

                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="info">
                                    <a href={`${process.env.REACT_APP_API_URL}/api/files/${fileId}`} className={styles.link} download>
                                        Скачать
                                    </a>
                                </Button>
                            </Stack>

                            <Snackbar open={!!error} autoHideDuration={5000}>
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    {error}
                                </Alert>
                            </Snackbar>
                        </>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default observer(DownloadInfo);

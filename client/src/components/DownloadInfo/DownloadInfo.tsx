import {Badge, Button, Container, Grid, Stack, Typography} from '@mui/material';
import {observer} from 'mobx-react-lite';
import {FC} from 'react';
import styles from './DownloadInfo.scss';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import HighlightIcon from '@mui/icons-material/Highlight';
import List from "@mui/material/List";
import * as React from "react";
import getFormattedFileSize from "../../utils/getFormattedFileSize";
import {AccountBalance, DateRange, HourglassTop} from "@mui/icons-material";

const DownloadInfo: FC = () => {

    return (
        <div className={styles.main}>
            <Container maxWidth="md" className={styles.container}>
                <Grid container direction="column" alignItems="center">
                    <br/>
                    <br/>
                    <Grid item>
                        <Typography component="h1" variant="h3" fontWeight="500">
                            File Ingester
                        </Typography>
                    </Grid>
                    <br/>
                    <br/>

                    <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Badge/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Name" secondary={'ReportForSecondDecade.csv'}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <HighlightIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Size" secondary={getFormattedFileSize(2048)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountBalance/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Count Download" secondary="Jan 7, 2014"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DateRange/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Date upload" secondary="July 20, 2014"/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <HourglassTop/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Expired date" secondary="July 20, 2014"/>
                        </ListItem>
                    </List>

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="info">
                            Скачать
                        </Button>
                    </Stack>
                </Grid>
            </Container>
        </div>
    );
};

export default observer(DownloadInfo);

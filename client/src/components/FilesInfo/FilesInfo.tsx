import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC } from 'react';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { useStore } from 'context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import getFormattedFileSize from 'utils/getFormattedFileSize';
import styles from './FilesInfo.module.scss';

const FilesInfo: FC = () => {
    const { filesStore } = useStore();

    if (filesStore.files === null) return null;

    return (
        <List className={styles.list}>
            {[...filesStore.files].map((file, i) => (
                <ListItem key={i} className={styles.listItem}>
                    <ListItemIcon>
                        <InsertDriveFileOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={file.name} secondary={getFormattedFileSize(file.size)} />
                </ListItem>
            ))}
        </List>
    );
};

export default observer(FilesInfo);

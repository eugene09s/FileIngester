import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { fileStorageTimeVariants } from 'stores/FilesStore';
import styles from './FileStorageTimeSelection.module.scss';

const FileStorageTimeSelection: FC = () => {
    const { filesStore } = useStore();

    function changeHandler(storageTime: string) {
        return () => {
            filesStore.setSotrageTime(storageTime);
        };
    }

    return (
        <Box className={styles.box}>
            <Typography component="p">Время хранения файла:</Typography>
            <RadioGroup className={styles.radioGroup} row name="file-storage-time">
                {fileStorageTimeVariants.map((storageTime, i) => (
                    <FormControlLabel
                        key={i}
                        control={<Radio checked={filesStore.storageTime === storageTime} onChange={changeHandler(storageTime)} />}
                        label={storageTime}
                    />
                ))}
            </RadioGroup>
        </Box>
    );
};

export default observer(FileStorageTimeSelection);
